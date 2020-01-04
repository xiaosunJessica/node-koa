
const Project = require('../models/project');
const jwt = require('jsonwebtoken');
const config = require('../config');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * 新增项目
 * @param {object} ctx
 */
const addProject = async ctx => {
  const { name } = ctx.request.body;
  let payload = getJWTPayload(ctx.headers.authorization)
  const user = payload.username
  let result = {
    success: false,
    message: '',
    data: null
  }
  
  const date = new Date().getTime();
  const id = Math.floor(Math.random() * 1000000);

  if (!name) {
    result.message = '项目名称不能为空';
    ctx.body = result;
  } else {
    const pModel = new Project({
      date,
      name,
      user,
      id
    })
    const prj = await pModel.save();
    if (!prj.errors) {
      result.message = '添加成功';
      result.success = true;
      ctx.body = result
    } else {
      ctx.body = result;
    }
  }

  // 用户判断

  ctx.body = result;
};

/**
 * 删除项目
 */
const deleteProject = async ctx => {
  let result = {
    success: false,
    message: '',
    data: null
  }
	const { id } = ctx.request.query;
	const data = await Project.deleteOne({_id: `${id}`});
  if (data.ok) {
		result.success = true;
	}
  ctx.body = result;
}
/**
 * 编辑项目
 */
const editProject = async ctx => {
  let result = {
    success: false,
    message: '',
    data: null
  }
	const { id, name } = ctx.request.body;
	const data = await Project.update({
		_id: `${id}`,
		name
	});
	if (data.ok) {
		result.success = true;
	}
  ctx.body = result;
}

/**
 * 项目列表
 */
const list = async ctx => {
  const size = Number(ctx.request.query.size || 10);
  const current = Number(ctx.request.query.current || 1);
  const skip = (current - 1) * size;
  let result = {
    success: false,
    message: '',
    data: null
  }
  result.data = await Project.find().skip(skip).limit(size);
  result.success = true;
  ctx.body = result;
}

const detail = async ctx => {
	const { id } = ctx.request.query;
	let result = {
    success: false,
    message: '',
    data: null
	}
	result.data = await Project.find({
		_id: `${id}`
	})
	result.success = true;
  ctx.body = result;
}

function getJWTPayload(token) {
  // 验证并解析JWT
  return jwt.verify(token.split(' ')[1], config.secretSign);
}


module.exports = { addProject, deleteProject, list, detail, editProject }