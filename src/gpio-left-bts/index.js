import { Gpio } from 'onoff';
import Config from "../config";

const button_on_click = (pin) => (err, value) => {
    console.log(pin, value);
};


Object.values(Config.gpio.left_control).map(
    (pin) => {
        const bt = new Gpio(pin, "in", "rising", {
            debounceTimeout: Config.gpio.button_debounce_timeout
        });
        bt.watch(button_on_click(pin));
        return bt;
    }
);