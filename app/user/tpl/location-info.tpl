            <form class="form-horizontal" aid="<%= aid %>">

                <div class="control-group">
                    <label class="control-label" for="inputEmail">校区：</label>
                    <div class="controls">
                        <select id="" name="">
                            <option value="0">
                            电子科技大学清水河校区
                            </option>
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="">选择自提：</label>
                    <div class="controls">
                        <input class="mentioning-address" type="checkbox"/>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="">详细地址：</label>
                    <div class="controls">
                        <input value="<%= detail %>" placeholder="x科x栋" class="sub-address" name="" type="text" ruler={"required":true,"xxs":true} />
                        <span class="help-inline"></span>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="inputPassword">收货人姓名：</label>
                    <div class="controls">
                        <input value="<%= name %>" placeholder="张三" class="sub-name" name="" type="text" ruler={"required":true,"xxs":true} />
                        <span class="help-inline"></span>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="inputPassword" >电话：</label>
                    <div class="controls">
                        <input value="<%= tel %>" placeholder="139xxxxxxxx" class="sub-tel" name="" type="text" ruler={"required":true,"xxs":true,"type":"phone"} />
                        <span class="help-inline"></span>
                    </div>
                </div>

            </form>
