import './globals.css';
import { Providers } from '@/components/Providers';
export const metadata={title:'StockLens — B20 Intelligence on Base',description:'Understand what your tokenized stocks actually represent.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="noise"><Providers>{children}</Providers></body></html>}
