export default {
    core: {
        port: 3838
    },
    receive: {
        uri: 'http://localhost:3838'
    },
    gpio: {
        button_debounce_timeout: 10,
        left_control: {
            button_1: 6,
            button_2: 0,
            button_3: 4,
            button_4: 5,
        },
        right_contol: {
            vrx: 17,
            vry: 27,
            sw: 22,
        },
    },
}