import React from "react";
import { getLoginTokenAnonymous } from "./api";

const token = getLoginTokenAnonymous();

export default function MainScreen() {
	return <div>{token}</div>;
}
