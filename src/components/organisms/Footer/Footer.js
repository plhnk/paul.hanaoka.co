import React from "react"
// import NightMode from '../../molecules/NightMode';
import { Base } from "reakit";
import styles from "./footer.module.css";

// const NightModeToggle = styled(Base)`
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     padding: 1.5rem .5rem;
//     @media (max-width: 1024px) {
//         bottom: calc(100vh - 5.7rem);
//       }
// `

export default () => 
    <footer>
        <Base>
            <Base>
                <p>Financed by <a href="https://liferay.com" target="_new">Liferay</a>, powered by <a href="https://gatsbyjs.com" target="_new">Gatsby</a>, hosted by <a href="https://wedeploy.com" target="_new">WeDeploy</a>.</p>
                <p className={styles.finePrint}>Copyright © 2018 Paul Hanaoka. Alt right reversed.</p></Base>
            {/* <NightModeToggle className={styles.nightMode}><NightMode></NightMode></NightModeToggle> */}
        </Base>
    </footer>