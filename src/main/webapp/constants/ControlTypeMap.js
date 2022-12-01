import HelpLinkComponent from '../components/HelpLinkComponent';
import TextComponent from '../components/TextComponent';
import TextAreaComponent from '../components/TextAreaComponent';
import SingleInputComponent from '../components/SingleInputComponent';
import MultiInputComponent from '../components/MultiInputComponent';
import CheckBoxComponent from '../components/CheckBoxComponent';
import RadioComponent from '../components/RadioComponent';
import PlaceholderComponent from '../components/PlaceholderComponent';
import CustomControl from '../components/CustomControl';

export default {
    text: TextComponent,
    textarea: TextAreaComponent,
    singleSelect: SingleInputComponent,
    helpLink: HelpLinkComponent,
    multipleSelect: MultiInputComponent,
    checkbox: CheckBoxComponent,
    radio: RadioComponent,
    placeholder: PlaceholderComponent,
    custom: CustomControl,
};
