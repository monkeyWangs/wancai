<template>
	<div id="partGroups">
		<div class="container">
			<el-dialog id="find_out" v-model="dialogFormVisible">
				<el-form>
					<el-form-item label="一级班组：" label-width='120px'>
						<el-input class="center_input" v-model="addGroupInfo.name" auto-complete="on" placeholder="请输入班组名称"></el-input>
						<el-button @click="onAddFirstGroup" type="primary" size="small">添加</el-button>
					</el-form-item>
				</el-form>
				<el-table class="deaital" :data="listProjectGroups" border tooltip-effect="dark" style="width: 100%">
					<el-table-column align="center" prop="name" label="名称" width="200">
					</el-table-column>
					<el-table-column align="center" prop="fullTimeCount" label="全职班组" width="200">
					</el-table-column>
					<el-table-column align="center" prop="partTimeCount" label="兼职班组" width="200">
					</el-table-column>
					<el-table-column align="center" prop="provide" label="操作" width="200">
						<template scope="scope">
							<el-button size="small" type="primary" @click="choiceFirstGroup(scope.$index, scope.row)">选择</el-button>
							<el-button size="small" type="danger" @click="deleteFirstGroup(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-dialog>
			<div class="addGroup">
				<div class="group">
					<div>一级岗位：</div>
					<span v-if="partTimeTeam.fristJobName">{{ partTimeTeam.fristJobName }}</span>
					<span v-else v-model="partTimeTeam.fristJobName">无</span>
					<el-button @click="showListTable" type="primary" size="small" style="margin-left: 10px;">添加</el-button>
				</div>
				<div class="group">
					<div>二级班组名称：</div>
			 	  <el-input v-model="partTimeTeam.secondJob" auto-complete="off" style="width: 180px;" placeholder="填写班组名称"></el-input>
				</div>
				<div class="group">
					<div>选择收入模式：</div>
					<el-select v-model="partTimeTeam.incomeType" placeholder="请选择">
					 <el-option
						 v-for="item in secondJobType"
						 :label="item.label"
						 :value="item.value">
					 </el-option>
				 </el-select>
				</div>
			</div>
			<div class="numberPrice">
				<div class="univalence">
					<span>接单价：</span>
					<el-input-number v-model="partTimeTeam.receiveOrderAmount" :min="1"></el-input-number>
					<span>放单价：</span>
					<el-input-number v-model="partTimeTeam.sendOrderAmount" :min="1"></el-input-number>
				</div>
				<div class="univalence">
					<span>计时工资:</span>
					<el-input-number v-model="partTimeTeam.salary" :min="1"></el-input-number>
				</div>
				<div class="univalence">
					<span>计件单价：</span>
					<el-input-number v-model="partTimeTeam.conditionList[0].amount" :min="1"></el-input-number>
					<span>计件条件 >= (件)</span>
					<el-input-number v-model="partTimeTeam.conditionList[0].numberCondition" :min="1"></el-input-number>
				</div>
				<div class="univalence">
					<span>计件单价：</span>
					<el-input-number v-model="partTimeTeam.conditionList[1].amount" :min="1"></el-input-number>
					<span>计件条件 >= (件)</span>
					<el-input-number v-model="partTimeTeam.conditionList[1].numberCondition" :min="1"></el-input-number>
				</div>
				<div class="univalence">
					<span>计件单价：</span>
					<el-input-number v-model="partTimeTeam.conditionList[2].amount" :min="1"></el-input-number>
					<span>计件条件 >= (件)</span>
					<el-input-number v-model="partTimeTeam.conditionList[2].numberCondition" :min="1"></el-input-number>
				</div>
				<div class="univalence">
					<span>计件单价：</span>
					<el-input-number v-model="partTimeTeam.conditionList[3].amount" :min="1"></el-input-number>
					<span>计件条件 >= (件)</span>
					<el-input-number v-model="partTimeTeam.conditionList[3].numberCondition" :min="1"></el-input-number>
				</div>
				<div class="univalence">
					<el-button type="primary" @click="handleAddGroupBtn" class="addlast">添加</el-button>
					<el-button type="danger" id="nomargin" @click="handleCancelBtn" class="addlast">取消</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import util from '../../../common/util';
	import { newProject } from '../../../store/groups_data';

	export default {
		name: "partGroups",
		data() {
			return {
				partTimeTeam: {
					fristJobId: '',
					fristJobName: '',
					secondJob: '',
					incomeType: 0,
					type: 0,
					receiveOrderAmount: '',
					sendOrderAmount: '',
					salary: '',
					conditionList: [{
						amount: 1,
						numberCondition: 1
					},
					{
						amount: 1,
						numberCondition: 1
					},
					{
						amount: 1,
						numberCondition: 1
					},
					{
						amount: 1,
						numberCondition: 1
					}]
				},
				listProjectGroups: [],
				addGroupInfo: {
					projectId: 1,
					name: ''
				},
				secondJobType: [{
					value: 0,
					label: '其他',
				},
				{
					value: 1,
					label: '计时',
				},
				{
					value: 2,
					label: '计件',
				}],
				dialogFormVisible: false,
			};
		},
		methods: {
			showListTable() {
				this.dialogFormVisible = true;
				this.getFirstGroupsList();
			},
			//内部添加班组
			onAddFirstGroup() {
				const params = {
					projectId: this.addGroupInfo.projectId,
					name: this.addGroupInfo.name,
				}
				this.$http.post('/project/job/add', params).then((response) => {
					this.addGroupInfo.name = '';
					if(response.data.errorCode === 10000) {
						this.$notify({
							title: '添加成功',
							type: 'success',
						});
						this.getFirstGroupsList();
					} else {
						this.$notify.error({
							title: response.data.moreInfo,
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			//选择添加自定义班组
			choiceFirstGroup(index, row) {
				this.partTimeTeam.fristJobName = row.name;
				this.partTimeTeam.fristJobId = row.id
				this.dialogFormVisible = false;
			},
			deleteFirstGroup(index, row) {
				this.$http.post('/project/job/delete', {
					id: row.id
				}).then((response) => {
					if(response.data.errorCode === 10000) {
						this.listProjectGroups.splice(index, 1);
						this.$notify.error({
							title: '删除成功',
							type: 'success',
						});
					} else {
						const {
							moreInfo
						} = response.data;
						this.$notify.error({
							title: moreInfo,
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			getFirstGroupsList() {
				this.$http.post('/project/job/list', {
					projectId: 1
				}).then((response) => {
					if(response.data.errorCode === 10000) {
						this.listProjectGroups = response.data.data
					} else {
						this.$notify.error({
							title: '拉取列表异常',
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			//添加班组
			handleAddGroupBtn() {
				newProject.addPartTime(this.partTimeTeam);
				this.$router.push({
					name: 'adminItemNew',
					params: {
						id: this.$route.params.id,
					}
				});
			},
			//取消按钮
			handleCancelBtn() {
				this.$router.push({
					name: 'adminItemNew',
					params: {
						id: this.$route.params.id
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	#partGroups {
		.tips {
			border-bottom: 1px solid #e5e9f2;
		}
		width: 100%;
		height: 100%;
		.deaital {
			text-align: center;
		}
		.container {
			width: 1000px;
			height: 100%;
			margin-left: 100px;
			.center_input {
				width: 70%;
			}
			.addGroup {
				width: 100%;
				height: 200px;
				.group {
					width: 100%;
					height: 40px;
					padding: 10px 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					div {
						width: 160px;
						height: 100%;
						color: dodgerblue;
						text-align: right;
						line-height: 40px;
						margin-right: 20px;
					}
					div:nth-of-type(1) {
						color: black;
					}
					.center_add {
						text-align: center;
						cursor: pointer;
					}
				}
			}
			.numberPrice {
				width: 100%;
				height: 100%;
				.univalence {
					width: 100%;
					height: 40px;
					padding: 14px 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					#nomargin {
						margin-left: 100px;
					}
					.addlast {
						width: 180px;
						margin-left: 180px;
					}
					span {
						width: 160px;
						height: 100%;
						text-align: right;
						line-height: 40px;
						margin-right: 20px;
					}
					span:nth-of-type(2) {
						width: 200px;
					}
				}
			}
		}
	}
</style>
