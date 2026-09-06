import { Nav } from './Nav';
export function AppShell({children}:{children:React.ReactNode}){return <><Nav/><main className="min-h-[calc(100vh-73px)] bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,.18),transparent_45%)]">{children}</main></>}
