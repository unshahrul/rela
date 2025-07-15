import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: any, res: any) {
  const data = JSON.parse(req.body)
  const { name, email, location, type, details, photoUrl } = data

  try {
    const response = await resend.emails.send({
      from: "RELA Report <noreply@yourdomain.com>",
      to: "team-rela@yourdomain.com",
      subject: `Laporan Baru dari ${name}`,
      html: `
        <h2>Laporan Baru</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Lokasi:</strong> ${location}</p>
        <p><strong>Jenis:</strong> ${type}</p>
        <p><strong>Butiran:</strong> ${details}</p>
        ${photoUrl ? `<p><strong>Gambar:</strong><br/><img src="${photoUrl}" width="400"/></p>` : ""}
      `,
    })

    return res.status(200).json({ success: true, id: response.id })
  } catch (error) {
    console.error("❌ Error sending email:", error)
    return res.status(500).json({ error: "Gagal hantar emel." })
  }
}
