// import React from "react";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";

// export function DialogDefault() {
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => setOpen(!open);

//   return (
//     <>
//       {/* <Button onClick={handleOpen} variant="gradient">
//         Open Dialog
//       </Button> */}
//       <Dialog open={open} handler={handleOpen}>
//         <DialogHeader>Delete Password</DialogHeader>
//         <DialogBody>Are you sure you want to DELETE</DialogBody>
//         <DialogFooter>
//           <Button
//             variant="text"
//             color="red"
//             onClick={handleOpen}
//             className="mr-1"
//           >
//             <span className="text-red">Cancel</span>
//           </Button>
//           <Button variant="gradient" color="green" onClick={handleOpen}>
//             <span className="text-green">Confirm</span>
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </>
//   );
// }
