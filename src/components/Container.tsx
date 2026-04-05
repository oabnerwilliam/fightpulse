export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 mt-32">
      {children}
    </div>
  )
}
