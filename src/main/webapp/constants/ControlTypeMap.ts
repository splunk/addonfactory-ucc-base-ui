import HelpLinkComponent from '../components/HelpLinkComponent';
import TextComponent from '../components/TextComponent';
import TextAreaComponent from '../components/TextAreaComponent';
import SingleInputComponent from '../components/SingleInputComponent';
import MultiInputComponent from '../components/MultiInputComponent';
import CheckBoxComponent from '../components/CheckBoxComponent';
import RadioComponent from '../components/RadioComponent';
import PlaceholderComponent from '../components/PlaceholderComponent';
import CustomControl from '../components/CustomControl';
import FileInputComponent from '../components/FileInputComponent';
import CheckboxGroupComponent from '../components/CheckboxGroupComponent/CheckboxGroupComponent';

export default {
    checkbox: CheckBoxComponent,
    checkboxGroup: CheckboxGroupComponent,
    custom: CustomControl,
    file: FileInputComponent,
    helpLink: HelpLinkComponent,
    multipleSelect: MultiInputComponent,
    placeholder: PlaceholderComponent,
    radio: RadioComponent,
    singleSelect: SingleInputComponent,
    text: TextComponent,
    textarea: TextAreaComponent,
} as const;
