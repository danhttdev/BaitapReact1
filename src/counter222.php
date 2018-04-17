<?php

	function decreaseCounter($num){
		// ket noi CSDL
		$conn = mysqli_connect('localhost', 'root', '12345678', 'baitapreact1') or die ('Không thể kết nối tới database');
		// xoa record CSDL
		$sqlDelete = "DELETE FROM btcounter WHERE roleCounter = 0 ORDER BY indexCounter DESC LIMIT 1";
		$num2 = $num;
		while($num2--){
			$kq = mysqli_query($conn,$sqlDelete);
		}
		echo $num;
		$sqlUpdateDad = "UPDATE btcounter SET valueCounter = valueCounter - '$num' WHERE roleCounter=1";
		mysqli_query($conn,$sqlUpdateDad);
		echo "xong";
	}

	function increaseCounter($num){
		// ket noi CSDL
		$conn = mysqli_connect('localhost', 'root', '12345678', 'baitapreact1') or die ('Không thể kết nối tới database');
		// chen vao CSDL
		$sqlInsert = "INSERT INTO btcounter (id,valueCounter,roleCounter) VALUES (rand(),1,0)";
		$num2 = $num;
		while($num2--){
			$kq = mysqli_query($conn,$sqlInsert);
		}
		// cap nhat Dad
		$sqlUpdateDad = "UPDATE btcounter SET valueCounter = valueCounter + '$num' WHERE roleCounter=1";
		mysqli_query($conn,$sqlUpdateDad);
		// lay chieu dai CSDL
		$sqlCount = "SELECT COUNT(*) FROM btcounter";
		$length = mysqli_fetch_array(mysqli_query($conn, $sqlCount))[0];

		// lay record con
		$sqlGetRecord = " SELECT * FROM btcounter WHERE roleCounter = 0";
		$resultGetRecord = mysqli_query($conn, $sqlGetRecord);
		$data = array();
		$i = 0;
		while($row = mysqli_fetch_assoc($resultGetRecord))
		{
			$i += 1;
			if ( $i >= ($length - $num) )	array_push($data, array('id' => $row['id'], 'value' => intval($row["valueCounter"]),'role'=> intval($row["roleCounter"])));
		}
		$json = json_encode($data);
		echo $json;
	}
	function getData(){
		// ket noi CSDL
		$conn = mysqli_connect('localhost', 'root', '12345678', 'baitapreact1') or die ('Không thể kết nối tới database');
		// lay record con
		$sqlGetRecord = " SELECT * FROM btcounter";
		$resultGetRecord = mysqli_query($conn, $sqlGetRecord);
		$data = array();
		$i = 0;
		while($row = mysqli_fetch_assoc($resultGetRecord))
		{
			$i += 1;
			if ( $i >= ($length - $num) )	array_push($data, array('id' => $row['id'], 'value' => intval($row["valueCounter"]),'role'=> intval($row["roleCounter"])));
		}
		$json = json_encode($data);
		echo $json;		
	}
	function deleteRecord($id){
		// ket noi CSDL
		$conn = mysqli_connect('localhost', 'root', '12345678', 'baitapreact1') or die ('Không thể kết nối tới database');
		// lay record con
		$sqlDeleteRecord = " DELETE FROM btcounter WHERE id='$id'";
		$sqlUpdate = "UPDATE btcounter SET valueCounter = valueCounter - 1 WHERE roleCounter = 1";
		$key = "XOA";
		if (mysqli_query($conn, $sqlDeleteRecord) && mysqli_query($conn, $sqlUpdate)){
			echo $key;
		}
	}
	function updateChild($id,$value){
		// ket noi CSDL
		$conn = mysqli_connect('localhost', 'root', '12345678', 'baitapreact1') or die ('Không thể kết nối tới database');
		// cap nhat Child
		$sqlUpdateChild = "UPDATE btcounter SET valueCounter = valueCounter + '$value' WHERE id='$id'";
		if (mysqli_query($conn,$sqlUpdateChild)){
			echo "CHILD_EDIT";
		}
		else echo "NOOO";
	}
	if(isset($_GET["type"]))  {
		$type = $_GET["type"];
		if ( $type == 1 )	
		increaseCounter($_GET["num"]);
		else decreaseCounter($_GET["num"]);
	}
	else if(isset($_GET["id"]))  {
		$id = $_GET["id"];
		$value = $_GET["value"];
		updateChild($id,$value);
	}
	else if(isset($_GET["idDelete"])) {
		deleteRecord($_GET["idDelete"]);
	}
	else {
		getData();
	}
    mysqli_close($connect); 
?> 
