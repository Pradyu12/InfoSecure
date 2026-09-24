import express from 'express'

const app = express()
app.use(express.json())

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Contact form endpoint — proxies to GitHub Issues API
app.post('/api/contact', async (req, res) => {
  const { name, email, company, subject, message } = req.body

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const pat = process.env.GITHUB_PAT
  const repo = process.env.GITHUB_REPO

  if (!pat || !repo) {
    console.error('Contact form misconfigured: missing GITHUB_PAT or GITHUB_REPO environment variables')
    return res.status(500).json({ error: 'Contact form is not configured' })
  }

  const body = [
    `**Name:** ${name}`,
    `**Email:** ${email}`,
    `**Company:** ${company || 'N/A'}`,
    `**Subject:** ${subject || 'N/A'}`,
    `**Message:** ${message}`
  ].join('\n')

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${pat}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        title: `Contact: ${subject || 'General inquiry'} from ${name}`,
        body,
        labels: ['contact']
      })
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`GitHub API error ${response.status}: ${errorBody}`)
      throw new Error(`GitHub API returned ${response.status}`)
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Contact form submission error:', error.message)
    res.status(500).json({ error: 'Failed to submit message. Please try again or email us directly.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Infosecure API server running on port ${PORT}`)
})
