import React, { useEffect, useState } from "react";
import { handleResponse, handleError } from "./ApiUtils";

const dataEndpoint = "https://vb-react-exam.netlify.app/api/form";

export function getData() {
    return fetch (dataEndpoint)
        .then(handleResponse)
        .catch(handleError);
}

export function submitData(payload) {
    return fetch (dataEndpoint, {
        method: "POST", // no need to put since data duplication is not an issue
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(payload)
    })
    .then(handleResponse)
    .catch(handleError);
}