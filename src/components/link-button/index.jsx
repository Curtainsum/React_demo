import React, { Component } from 'react'
import './index.css'

export default class LinkButton extends Component {
    render() {
        //console.log({...this.props})
        return(
        <button {...this.props} className="link-button"></button>
        )
    }
}

// import React from 'react'
// /*
// 外形像链接的按钮
//  */
// export default function LinkButton(props) {
//   return <button {...props} className="link-button"></button>
// }
