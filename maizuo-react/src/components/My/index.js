import React from "react"
import ReactDOM from "react-dom"
import DatePicker from 'antd/lib/date-picker';  // 加载 JS
import 'antd/dist/antd.css';      
const { MonthPicker, RangePicker } = DatePicker;
import { Carousel } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
import "./index.scss"

class Home extends React.Component{
	render(){
		return <div>


		

		 <Carousel autoplay>
		   <div><h3>1</h3></div>
		   <div><h3>2</h3></div>
		   <div><h3>3</h3></div>
		   <div><h3>4</h3></div>
		 </Carousel>

		 <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
		       <Option value="jack">Jack</Option>
		       <Option value="lucy">Lucy</Option>
		       <Option value="disabled" disabled>Disabled</Option>
		       <Option value="Yiminghe">yiminghe</Option>
		     </Select>
		     <Select defaultValue="lucy" style={{ width: 120 }} allowClear disabled>
		       <Option value="lucy">Lucy</Option>
		     </Select>
		</div>
	}
	onChange(date, dateString) {
	  console.log(date, dateString);
	}
	handleChange(value) {
	  console.log(`selected ${value}`);
	}
}

export default Home