package com.example.demo.model;

public class TweetsObject {
	
	Tweet[] data;
	Object includes;
	Object meta;
	
	public Tweet[] getData() {
		return data;
	}
	public void setData(Tweet[] data) {
		this.data = data;
	}
	public Object getIncludes() {
		return includes;
	}
	public void setIncludes(Object includes) {
		this.includes = includes;
	}
	public Object getMeta() {
		return meta;
	}
	public void setMeta(Object meta) {
		this.meta = meta;
	}
	
	

}
