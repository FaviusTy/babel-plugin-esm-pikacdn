import * as source1 from "./module1";
import * as source2 from "../module2";
import { source3 } from "./module3.js";
import { source4 } from "/module4";
import def, { sub1, sub2 } from "./module5/index";
import reframe from "reframe.js";
import mitt from "mitt";
import either from "@favi_ty/either";
import otherLib from "other-lub";
import { Component, render } from "https://cdn.pika.dev/preact/v8";
const module = import("./lazy-module");
const lazyReframe = import("reframe.js");
