import Vue from "vue";

//Import Froala Editor
import "froala-editor/js/plugins.pkgd.min.js";
//Import third party plugins
import "froala-editor/js/third_party/embedly.min";
import "froala-editor/js/third_party/font_awesome.min";
import "froala-editor/js/third_party/spell_checker.min";
import "froala-editor/js/languages/es.js";

import "froala-editor/js/third_party/image_tui.min";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/css/plugins/draggable.min.css";

// Import Froala Editor css files.
import "froala-editor/css/froala_editor.pkgd.min.css";

import VueFroala from "vue-froala-wysiwyg";

Vue.use(VueFroala);
