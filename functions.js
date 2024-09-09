module.exports = {
	rep: function (res, status, data) {
		return res.status(status.code).json({
			status: { success: status.success, msg: status.msg },
			data
		})
	}
};