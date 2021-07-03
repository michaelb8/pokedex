import { Navbar } from "reactstrap"

interface Props {
  title: string
}

export const Header: React.FC<Props> = ({title}: Props) => {
  return (
    <div>
      <Navbar className="navbar-brand m-2">
        {title}
      </Navbar>
    </div>
  )
}
