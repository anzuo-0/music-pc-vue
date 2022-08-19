import {
    Select,
    Option,
    OptionGroup,
    Input,
    InputNumber,
    Radio,
    Dialog,
    Row,
    Col,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Cascader,
    Switch,
    TimeSelect,
    TimePicker,
    DatePicker,
    Transfer,
    Form,
    FormItem,
    Table,
    TableColumn,
    Button,
    Progress,
    Pagination,
    Alert,
    Loading,
    Message,
    MessageBox,
    Notification,
    Menu,
    MenuItemGroup,
    MenuItem,
    Submenu,
    RadioGroup,
    RadioButton,
    Card,
    Carousel,
    CarouselItem,


} from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(OptionGroup)
        Vue.use(Input)
        Vue.use(InputNumber)
        Vue.use(Radio)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Checkbox)
        Vue.use(CheckboxButton)
        Vue.use(CheckboxGroup)
        Vue.use(Cascader)
        Vue.use(Switch)
        Vue.use(TimePicker)
        Vue.use(TimeSelect)
        Vue.use(DatePicker)
        Vue.use(Transfer)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Button)
        Vue.use(Progress)
        Vue.use(Pagination)
        Vue.use(Alert)
        Vue.use(Loading)
        Vue.use(Menu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)
        Vue.use(Submenu)
        Vue.use(RadioGroup)
        Vue.use(RadioButton)
        Vue.use(Card)
        Vue.use(Carousel)
        Vue.use(CarouselItem)

        Vue.prototype.$message = Message;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$notify = Notification;

    }
}

export default element