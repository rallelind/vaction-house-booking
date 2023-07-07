

export default function Layout({children}: {
  children: React.ReactNode
}) {
    return (
        <div>
            <header>hello world</header>
            <div className="p-20">{children}</div>
        </div>
    )
}