// import React, { useContext, useState } from "react";
// import { TabbableContainer, ContBody } from "../../layout/GridStyle";
// import Header from "../../layout/header";
// import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";
// import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
// import { loanDictionaryList } from "./localization";
// import TopBar from "../../sharedComponents/topBar/topBar";
// import Composer from "./composer";
// import "./style.css";
// import styled from "styled-components";
// import ListView from "./ListView";
// import ListBoxes from "./ListBoxes";

// function Index() {
//   const { userLanguage } = useContext(LanguageChangeContext);
//   const { loanDictionary } = loanDictionaryList[userLanguage];

//   const [tableView, setTableView] = useState(false);

//   const [filter, setFilter] = useState({ filterType: 0, search: "" });

//   return (
//     <TabbableContainer>
//       <Header
//         buttons={[
//           {
//             buttonText: "Create Loan",
//             // onClick: () => setVisible(true),
//             render: (
//               <SideDrawer
//                 title={loanDictionary.createLoan}
//                 buttonText={loanDictionary.createLoan}
//                 isAccessDrawer={false}
//               >
//                 <Composer />
//               </SideDrawer>
//             ),
//           },
//         ]}
//       />
//       <TopBar
//         onSearch={(value) => {
//           console.log(value);
//         }}
//         buttons={[
//           {
//             name: "Loans",
//             onClick: () => setFilter({ filterType: 0 }),
//           },
//           {
//             name: "For Approval",
//             onClick: () => setFilter({ filterType: 1 }),
//           },
//           {
//             name: "Loans To Me",
//             onClick: () => setFilter({ filterType: 2 }),
//           },
//         ]}
//         filter={{
//           onFilter: () => {},
//         }}
//         segment={{
//           onSegment: (value) => {
//             if (value === "Table") {
//               setTableView(true);
//             } else {
//               setTableView(false);
//             }
//           },
//           label1: "List",
//           label2: "Table",
//         }}
//       />
//       <ListBoxes />
//       <ContBody>
//         <ListView />
//       </ContBody>
//     </TabbableContainer>
//   );
// }

// export default Index;
import React from "react";

const Resignation = () => {
  return <div>test</div>;
};

export default Resignation;
