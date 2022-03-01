import React, { useEffect, useState } from "react";
import { handleResponse, handleError } from "./ApiUtils";

const dataEndpoint = "https://vb-react-exam.netlify.app/api/form";

export function getData() {
    return fetch (dataEndpoint)
        .then(handleResponse)
        .catch(handleError);
}

export function submitData(entryData) {
    return fetch (dataEndpoint, {
        method: "POST", // no need to put since data duplication is not an issue
        headers: { "content-type" : "application/json" },
        body: JSON.stringify(entryData)
    })
    .then(handleResponse)
    .catch(handleError);
}