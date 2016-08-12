/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 12/08/2016
 * Time: 10:33
 */
/**
 * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
 */

import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default {
    spacing: spacing,
    fontFamily: '"Varela Round", Roboto, sans-serif',
    palette: {
        primary1Color: "#273444",
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: "#59C4F8",
        accent2Color: grey100,
        accent3Color: grey500,
        accent4Color: "#66E8C9",
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
};