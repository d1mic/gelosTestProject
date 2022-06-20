import Header from "../Header";
import Footer from "../Footer"

function Layout(props) {
  return (
    <div>
      <Header></Header>
      <main>{props.children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout