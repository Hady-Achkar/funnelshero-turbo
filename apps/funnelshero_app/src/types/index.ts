import React from "react";
import { ITarget } from "interfaces";

export type TypeInputChangeEvent =
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | ITarget;
