import HelpLinkComponent from '../components/HelpLinkComponent';
import TextComponent from '../components/TextComponent';
import AltSingleInputComponent from '../components/AltSingleInputComponent';
import MultiInputComponent from '../components/MultiInputComponent';
import CheckBoxComponent from '../components/CheckBoxComponent';
import RadioComponent from '../components/RadioComponent';
import CustomControl from '../components/CustomControl';

export default {
    'text': TextComponent,
    'singleSelect': AltSingleInputComponent,
    'helpLink':HelpLinkComponent,
    'multipleSelect':MultiInputComponent,
    'checkbox':CheckBoxComponent,
    'radio':RadioComponent,
    'custom':CustomControl
};
