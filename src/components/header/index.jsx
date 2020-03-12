import React, { Component } from 'react'
import './index.css'
import { Modal} from 'antd'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqWeather} from '../../api/index'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'
 
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl:'',
        weather:'',
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem =  item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    getTime = () =>{
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getWeather = async () => {
        const {dayPictureUrl,weather} = await reqWeather('北京')
        this.setState({dayPictureUrl,weather})
    }

    Logout = () => {
        // 显示确认框
        Modal.confirm({
          content: '确定退出吗?',
          onOk: () => {
            console.log('OK', this)
            // 删除保存的user数据
            storageUtils.removeUser()
            memoryUtils.user = {}
    
            // 跳转到login
            this.props.history.replace('/login')
          }
        })
      }

    componentDidMount(){
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render() {
        const {currentTime,dayPictureUrl,weather} = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        //console.log(title)
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <LinkButton onClick={this.Logout} >退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Header)
