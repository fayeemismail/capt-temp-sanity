import { sanityClient } from '@/lib/sanity.client'
import NavbarClient from './NavbarClient'

const Navbar = async () => {
  const data = await sanityClient.fetch(`
    *[_type == "globalSettings"][0]{
      navbar{
        logo,
        links
      }
    }
  `)

  return <NavbarClient navbar={data?.navbar} />
}

export default Navbar







// import { sanityClient } from '@/lib/sanity.client'



// const Navbar = async () => {
//     const { navbar } =
//         await sanityClient.fetch(`
//             *[_type == "globalSettings"][0]{
//             navbar{
//             logo,
//             links
//                 }
//             }
//         `);

//         const {links, logo} = navbar
//             console.log("Data: ",logo, links)
//     return (
//         <div>Navbar</div>
//     )
// }

// export default Navbar