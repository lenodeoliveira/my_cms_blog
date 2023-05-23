import React from "react"

function EmptyTableMessage({ length, resource }) {
    return (
        !length ? (
            <span className="font-weight-normal">{`TABLE ${resource.toUpperCase()} EMPTY` }</span>
        ) : null
    )
}

export default EmptyTableMessage