const Lead = require('../models/Lead');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@afodamsproperty.com';
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@afodamsproperty.com';

exports.createLead = async (req, res) => {
  try {
    const { name, phone, propertyInterest, budget, message, source } = req.body;

    if (!name || !phone || !propertyInterest || !budget) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, property interest, and budget are required.',
      });
    }

    const lead = await Lead.create({
      name: name.trim(),
      phone: phone.trim(),
      propertyInterest: propertyInterest.trim(),
      budget: budget.trim(),
      message: message?.trim() || '',
      source: source || 'landing_page',
      status: 'new',
    });

    // Send admin notification email — non-blocking
    if (process.env.SENDGRID_API_KEY) {
      sgMail.send({
        to: ADMIN_EMAIL,
        from: FROM_EMAIL,
        subject: `New Property Lead — ${name} (${propertyInterest})`,
        html: `
          <div style="font-family:Georgia,serif;max-width:560px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)">
            <div style="background:#1a3c2e;padding:32px 40px">
              <h1 style="color:#c9a84c;margin:0;font-size:22px">New Property Inquiry</h1>
              <p style="color:#9db8a8;margin:6px 0 0;font-size:13px">Afodams Property Management</p>
            </div>
            <div style="padding:32px 40px">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Property:</strong> ${propertyInterest}</p>
              <p><strong>Budget:</strong> ${budget}</p>
              ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
              <div style="margin-top:24px;text-align:center">
                <a href="https://wa.me/${process.env.WHATSAPP_NUMBER || ''}?text=Hi%20${encodeURIComponent(name)}"
                   style="background:#25D366;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;display:inline-block">
                  Reply on WhatsApp
                </a>
              </div>
            </div>
            <div style="background:#f4f0e8;padding:16px 40px;font-size:12px;color:#999;text-align:center">
              Received ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })} WAT
            </div>
          </div>
        `,
        text: `New Lead\nName: ${name}\nPhone: ${phone}\nProperty: ${propertyInterest}\nBudget: ${budget}\nMessage: ${message || 'None'}`,
      }).catch((err) => console.error('[SendGrid] Email failed:', err.message));
    }

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
      leadId: lead._id,
    });
  } catch (error) {
    console.error('[Lead] createLead error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or reach us on WhatsApp.',
    });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Lead.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('[Lead] getLeads error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads.' });
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const validStatuses = ['new', 'contacted', 'viewing_scheduled', 'converted', 'lost'];
    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    console.error('[Lead] updateLeadStatus error:', error);
    res.status(500).json({ success: false, message: 'Failed to update lead status.' });
  }
};
