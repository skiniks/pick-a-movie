interface WrapperProps {
  children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-center">
      {children}
    </main>
  )
}

export default Wrapper
