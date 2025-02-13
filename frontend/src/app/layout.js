import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: "depati marketplace",
  description: "tempat belanja favorit dengan barang yang lengkap dan harga terjangkau",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
