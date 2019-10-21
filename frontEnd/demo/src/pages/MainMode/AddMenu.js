import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, Modal } from 'antd';
import { slide as Menu } from "react-burger-menu";
class AddMenu extends React.Component {
    state = {
        show:false
      };
      onClick = () => {
        this.setState({
          show: !this.state.show
        });
      }    
render()
{
   
    return(
    <div>
        
        <Menu isOpen={this.state.show} width={"50%"}>
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
          <a onClick={this.showSettings} className="menu-item--small" href="">
            Settings
          </a>
        </Menu>
    </div>
    )
}
}
export default AddMenu;