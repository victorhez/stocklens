import './globals.css';
import { Providers } from '@/components/Providers';
export const metadata={title:'StockLens — B20 Intelligence on Base',description:'Understand what your tokenized stocks actually represent.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><meta name="base:app_id" content="6a9e6d1a5538a47d1b071b9f" /></head><body className="noise"><Providers>{children}</Providers></body></html>}
