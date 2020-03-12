import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Icon,
    message
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api'

export default class Category extends Component {

    state = {
        categorys: [],
    }

    getCategorys = async () => {
        const result = await reqCategorys()
        if(result.status === 0){
            const categorys = result.data
            this.setState({categorys})
        }else {
            message.error('获取失败')
        }
    }

    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: '400px',
                render: () =>
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>

            },
        ]

    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {
        const { categorys } = this.state

        const title = '一级分类列表'

        const extra = (
            <Button type="primary">
                <Icon type='plus' />
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table 
                bordered 
                rowKey='_id' 
                dataSource={categorys} 
                columns={this.columns}
                pagination={{defaultPageSize: 6, showQuickJumper: true}}
                />
            </Card>
        )
    }
}