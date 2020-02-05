<template>
    <div id="leave-cus">
      <br>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="customerId"
          label="会员ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话号码">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="times"
          label="剩余次数">
        </el-table-column>
        <el-table-column
          prop="joinTime"
          label="加入时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <span>确定要删除该会员吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="dialogVisible = false,delCus()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "LeaveCus",
      data(){
          return{
            tableData: [],
            dialogVisible:false,
            cusId:0,
            rows:[],
            index:0
          }
      },
      methods:{
          listCustomer(){
            this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8082/manager/list_customer').then(res =>{
              if (res.data.code !== 0){
                alert(res.data.msg)
                this.tableData = []
                return
              }
              this.tableData = res.data.data
            }).catch(err =>{
              alert('系统错误')
            })
          },
        delCus(){
          console.log(this.rows[this.index].customerId)
          let deleteVo = {
            customerId:this.rows[this.index].customerId,
            managerId:localStorage.getItem('userId')
          }
          this.$axios.post('http://'+localStorage.getItem('ipAddress')+':8082/customer/delete',deleteVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            alert('删除成功')
            this.$router.go(0);
          }).catch(err =>{
            alert('系统错误')
          })
        },
        deleteRow(index, rows) {
            this.rows = rows
          this.index = index
          this.dialogVisible = true
        }
      },
      mounted() {
          this.listCustomer()
      }
    }
</script>

<style scoped>

</style>
