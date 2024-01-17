import { Image } from "react-native"
import { styles } from "../assets/css/styles"
export default function Logo({styles}) {
    return(
        <Image
            style={styles}
            source={require('../assets/images/kcc-logo.png')}
        />
    );
}