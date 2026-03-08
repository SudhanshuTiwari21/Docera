-- Track whether we've sent a renewal reminder for this subscription (avoid duplicate emails)
ALTER TABLE subscriptions
  ADD COLUMN IF NOT EXISTS renewal_reminder_sent_at TIMESTAMPTZ;
/login and /signup with changeFrequency: "monthly" and priority: 0.5.
