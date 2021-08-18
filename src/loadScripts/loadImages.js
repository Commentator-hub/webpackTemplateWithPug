import {requireAll} from "./loadSprite";

requireAll(require.context('../static/images/general', true, /\.(png|jpg|jpeg|gif)$/i));