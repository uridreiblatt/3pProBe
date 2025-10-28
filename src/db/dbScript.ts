// USE [master]
// GO
// /****** Object:  Database [compulockOrders]    Script Date: 11/10/2024 15:00:53 ******/
// CREATE DATABASE [compulockOrders]
//  CONTAINMENT = NONE
//  ON  PRIMARY 
// ( NAME = N'compulockOrders', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\compulockOrders.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
//  LOG ON 
// ( NAME = N'compulockOrders_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\compulockOrders_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
//  WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
// GO
// ALTER DATABASE [compulockOrders] SET COMPATIBILITY_LEVEL = 160
// GO
// IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
// begin
// EXEC [compulockOrders].[dbo].[sp_fulltext_database] @action = 'enable'
// end
// GO
// ALTER DATABASE [compulockOrders] SET ANSI_NULL_DEFAULT OFF 
// GO
// ALTER DATABASE [compulockOrders] SET ANSI_NULLS OFF 
// GO
// ALTER DATABASE [compulockOrders] SET ANSI_PADDING OFF 
// GO
// ALTER DATABASE [compulockOrders] SET ANSI_WARNINGS OFF 
// GO
// ALTER DATABASE [compulockOrders] SET ARITHABORT OFF 
// GO
// ALTER DATABASE [compulockOrders] SET AUTO_CLOSE OFF 
// GO
// ALTER DATABASE [compulockOrders] SET AUTO_SHRINK OFF 
// GO
// ALTER DATABASE [compulockOrders] SET AUTO_UPDATE_STATISTICS ON 
// GO
// ALTER DATABASE [compulockOrders] SET CURSOR_CLOSE_ON_COMMIT OFF 
// GO
// ALTER DATABASE [compulockOrders] SET CURSOR_DEFAULT  GLOBAL 
// GO
// ALTER DATABASE [compulockOrders] SET CONCAT_NULL_YIELDS_NULL OFF 
// GO
// ALTER DATABASE [compulockOrders] SET NUMERIC_ROUNDABORT OFF 
// GO
// ALTER DATABASE [compulockOrders] SET QUOTED_IDENTIFIER OFF 
// GO
// ALTER DATABASE [compulockOrders] SET RECURSIVE_TRIGGERS OFF 
// GO
// ALTER DATABASE [compulockOrders] SET  DISABLE_BROKER 
// GO
// ALTER DATABASE [compulockOrders] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
// GO
// ALTER DATABASE [compulockOrders] SET DATE_CORRELATION_OPTIMIZATION OFF 
// GO
// ALTER DATABASE [compulockOrders] SET TRUSTWORTHY OFF 
// GO
// ALTER DATABASE [compulockOrders] SET ALLOW_SNAPSHOT_ISOLATION OFF 
// GO
// ALTER DATABASE [compulockOrders] SET PARAMETERIZATION SIMPLE 
// GO
// ALTER DATABASE [compulockOrders] SET READ_COMMITTED_SNAPSHOT OFF 
// GO
// ALTER DATABASE [compulockOrders] SET HONOR_BROKER_PRIORITY OFF 
// GO
// ALTER DATABASE [compulockOrders] SET RECOVERY FULL 
// GO
// ALTER DATABASE [compulockOrders] SET  MULTI_USER 
// GO
// ALTER DATABASE [compulockOrders] SET PAGE_VERIFY CHECKSUM  
// GO
// ALTER DATABASE [compulockOrders] SET DB_CHAINING OFF 
// GO
// ALTER DATABASE [compulockOrders] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
// GO
// ALTER DATABASE [compulockOrders] SET TARGET_RECOVERY_TIME = 60 SECONDS 
// GO
// ALTER DATABASE [compulockOrders] SET DELAYED_DURABILITY = DISABLED 
// GO
// ALTER DATABASE [compulockOrders] SET ACCELERATED_DATABASE_RECOVERY = OFF  
// GO
// EXEC sys.sp_db_vardecimal_storage_format N'compulockOrders', N'ON'
// GO
// ALTER DATABASE [compulockOrders] SET QUERY_STORE = ON
// GO
// ALTER DATABASE [compulockOrders] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
// GO
// USE [compulockOrders]
// GO
// /****** Object:  Table [dbo].[task_user]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[task_user](
// 	[id] [uniqueidentifier] NOT NULL,
// 	[DataInfo] [nvarchar](255) NOT NULL,
// 	[PartNumber] [nvarchar](255) NOT NULL,
// 	[QTYtoassemble] [nvarchar](255) NOT NULL,
// 	[QTYassembled] [nvarchar](255) NOT NULL,
// 	[Total] [nvarchar](255) NULL,
// 	[BIN] [nvarchar](255) NULL,
// 	[QTY] [nvarchar](255) NULL,
// 	[BIN_1] [nvarchar](255) NULL,
// 	[QTY_1] [nvarchar](255) NULL,
// 	[BIN_2] [nvarchar](255) NULL,
// 	[QTY_2] [nvarchar](255) NULL,
// 	[Supplier] [nvarchar](255) NULL,
// 	[PalletNumber] [nvarchar](255) NULL,
// 	[PO] [nvarchar](255) NULL,
// 	[taskInfo] [nvarchar](255) NULL,
// 	[NoOfBoxes] [nvarchar](255) NULL,
// 	[NoOfItems] [nvarchar](255) NULL,
// 	[Color] [nvarchar](255) NULL,
// 	[created_at] [datetime2](7) NOT NULL,
// 	[updated_at] [datetime2](7) NOT NULL,
// 	[taskTypeId] [int] NOT NULL,
// 	[userId] [int] NOT NULL,
// 	[taskStatusId] [int] NOT NULL,
// 	[orderName] [varchar](50) NULL,
//  CONSTRAINT [PK_6ea2c1c13f01b7a383ebbeaebb0] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[task_type]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[task_type](
// 	[id] [int] IDENTITY(1,1) NOT NULL,
// 	[role] [nvarchar](255) NOT NULL,
//  CONSTRAINT [PK_a0669bd34078f33604ec209dab1] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[task_status]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[task_status](
// 	[id] [int] IDENTITY(1,1) NOT NULL,
// 	[status] [nvarchar](255) NOT NULL,
// 	[color] [nchar](10) NULL,
//  CONSTRAINT [PK_b8747cc6a41b6cef4639babf61d] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  View [dbo].[V_DashBoardTasks]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO







// CREATE   VIEW [dbo].[V_DashBoardTasks]
// AS
// SELECT tt.role 
// 		,ts.status,
// 		(select count(*) from  [compulockOrders].[dbo].[task_user] tu  where ts.id=tu.taskStatusId and tt.id = tu.taskTypeId) as countStatus
//   FROM 
//    [compulockOrders].[dbo].[task_type] tt,  [compulockOrders].[dbo].[task_status] ts 
// GO
// /****** Object:  Table [dbo].[order_Boxes]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[order_Boxes](
// 	[id] [uniqueidentifier] NOT NULL,
// 	[boxSizeId] [int] NOT NULL,
// 	[boxNo] [int] NOT NULL,
// 	[boxweight] [float] NOT NULL,
// 	[lineRemarks] [nvarchar](255) NULL,
// 	[orderId] [uniqueidentifier] NULL,
//  CONSTRAINT [PK_01a7c973d9f30479647e44f9842] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[user]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[user](
// 	[id] [int] IDENTITY(1,1) NOT NULL,
// 	[userName] [nvarchar](255) NOT NULL,
// 	[userSurname] [nvarchar](255) NOT NULL,
// 	[userUuid] [nvarchar](255) NOT NULL,
// 	[usermail] [nvarchar](255) NOT NULL,
// 	[userMobile] [nvarchar](255) NOT NULL,
// 	[userPasswordEnc] [nvarchar](255) NOT NULL,
// 	[otp] [nvarchar](255) NOT NULL,
// 	[color] [nvarchar](255) NULL,
//  CONSTRAINT [PK_cace4a159ff9f2512dd42373760] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[order]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[order](
// 	[id] [uniqueidentifier] NOT NULL,
// 	[CUSTNAME] [nvarchar](255) NOT NULL,
// 	[CUSTNO] [nvarchar](255) NOT NULL,
// 	[ORDNAME] [nvarchar](255) NOT NULL,
// 	[STCODE] [nvarchar](255) NOT NULL,
// 	[STDES] [nvarchar](255) NOT NULL,
// 	[created_at] [datetime2](7) NOT NULL,
// 	[updated_at] [datetime2](7) NOT NULL,
// 	[userId] [int] NULL,
// 	[taskStatusId] [int] NULL,
// 	[orderRemarks] [nvarchar](255) NULL,
// 	[ADDRESS] [nvarchar](255) NULL,
// 	[ADDRESS2] [nvarchar](255) NULL,
// 	[ADDRESS3] [nvarchar](255) NULL,
// 	[STATE] [nvarchar](255) NULL,
// 	[STATECODE] [nvarchar](255) NULL,
// 	[STATENAME] [nvarchar](255) NULL,
// 	[ZIP] [nvarchar](255) NULL,
// 	[COUNTRYNAME] [nvarchar](255) NULL,
// 	[roleId] [int] NULL,
// 	[CURDATE] [nvarchar](255) NULL,
// 	[OrderText] [nvarchar](255) NULL,
// 	[orderPhotoBase64] [text] NULL,
// 	[orderPhotoBase64_1] [text] NULL,
// 	[orderPhotoBase64_2] [text] NULL,
// 	[priorityOrder] [int] NULL,
//  CONSTRAINT [PK_1031171c13130102495201e3e20] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[order_line]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[order_line](
// 	[id] [uniqueidentifier] NOT NULL,
// 	[PARTNAME] [nvarchar](255) NOT NULL,
// 	[PARTDES] [nvarchar](255) NOT NULL,
// 	[TBALANCE] [int] NOT NULL,
// 	[BARCODE] [nvarchar](255) NOT NULL,
// 	[lineRemarks] [nvarchar](255) NULL,
// 	[created_at] [datetime2](7) NOT NULL,
// 	[updated_at] [datetime2](7) NOT NULL,
// 	[orderId] [uniqueidentifier] NULL,
// 	[taskStatusId] [int] NULL,
// 	[Fullfilled] [int] NULL,
// 	[approved] [bit] NULL,
// 	[pickingError] [bit] NULL,
//  CONSTRAINT [PK_01a7c973d9f30479647e44f9892] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  View [dbo].[v_report_orders]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO


// CREATE VIEW [dbo].[v_report_orders]
// AS
// SELECT  [CUSTNAME]
//       ,[CUSTNO]
//       ,[ORDNAME]
//       ,[STCODE]
//       ,[STDES]
//       ,cast([created_at]as date)    created_at
//       ,(select u.username from [compulockOrders].[dbo].[user] u where u.id = l.userId) as userName
//       ,(select ts.status from [compulockOrders].[dbo].[task_status] ts where ts.id = l.taskStatusId) as taskStatusId
//       ,[orderRemarks]          
//       ,[STATENAME]
//       ,[COUNTRYNAME]
//       ,[roleId]
// 	 , (select sum(ol.TBALANCE) from [compulockOrders].[dbo].[order_line] ol where ol.orderId = l.id ) as order_product_lines
// 	  , (select COUNT(*) from [compulockOrders].[dbo].[order_Boxes] ob where ob.orderId = l.id ) as order_boxes
// FROM     dbo.[order] l
// GO
// /****** Object:  View [dbo].[V_all_tasks_Assembly]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO



// CREATE   VIEW [dbo].[V_all_tasks_Assembly]
// AS
// SELECT    
// 	   [DataInfo]
//       ,[PartNumber]
//       ,[QTYtoassemble]
//       ,[QTYassembled]      
//       ,cast([created_at] as date) as [created_at]
//       --,[taskTypeId]
// 	  ,(select u.username from [compulockOrders].[dbo].[user] u where u.id = tu.userId) as userName
//       ,(select ts.status from [compulockOrders].[dbo].[task_status] ts where tu.taskStatusId = ts.id) as taskStatusId     
//   FROM [compulockOrders].[dbo].[task_user] tu
//   where tu.taskTypeId=1
// GO
// /****** Object:  View [dbo].[V_all_tasks_inventory_count]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO



// CREATE   VIEW [dbo].[V_all_tasks_inventory_count]
// AS
// SELECT    
// 	   [DataInfo]
//       ,[PartNumber]
//       ,[Total]
//       ,[BIN]   
// 	  ,[QTY]
// 	  ,[BIN_1]
// 	  ,[QTY_1]
// 	  ,[BIN_2]
// 	  ,[QTY_2]
//       ,cast([created_at] as date) as [created_at]
//       --,[taskTypeId]
// 	  ,(select u.username from [compulockOrders].[dbo].[user] u where u.id = tu.userId) as userName
//       ,(select ts.status from [compulockOrders].[dbo].[task_status] ts where tu.taskStatusId = ts.id) as taskStatusId     
//   FROM [compulockOrders].[dbo].[task_user] tu
//   where tu.taskTypeId=2
// GO
// /****** Object:  View [dbo].[V_all_tasks_good_recived]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO



// CREATE   VIEW [dbo].[V_all_tasks_good_recived]
// AS
// SELECT    
// 	   [DataInfo]
// 	   ,[Supplier]
// 	   ,[PalletNumber]
// 	   ,[PO]
//       ,[PartNumber]
//       ,[QTY]
// 	  ,[NoOfBoxes]
// 	  ,[NoOfItems]
// 	  ,[Color]
// 	  ,cast([created_at] as date) as [created_at]
//       --,[taskTypeId]
// 	  ,(select u.username from [compulockOrders].[dbo].[user] u where u.id = tu.userId) as userName
//       ,(select ts.status from [compulockOrders].[dbo].[task_status] ts where tu.taskStatusId = ts.id) as taskStatusId     
//   FROM [compulockOrders].[dbo].[task_user] tu
//   where tu.taskTypeId=2
// GO
// /****** Object:  View [dbo].[V_all_tasks_warehouse]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO



// CREATE   VIEW [dbo].[V_all_tasks_warehouse]
// AS
// SELECT    
// 	   [DataInfo]	 
// 	   ,[PalletNumber]
// 	  ,cast([created_at] as date) as [created_at]
//       --,[taskTypeId]
// 	  ,(select u.username from [compulockOrders].[dbo].[user] u where u.id = tu.userId) as userName
//       ,(select ts.status from [compulockOrders].[dbo].[task_status] ts where tu.taskStatusId = ts.id) as taskStatusId     
//   FROM [compulockOrders].[dbo].[task_user] tu
//   where tu.taskTypeId=2
// GO
// /****** Object:  Table [dbo].[role]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[role](
// 	[id] [int] IDENTITY(1,1) NOT NULL,
// 	[role] [nvarchar](255) NOT NULL,
// 	[roleDisplayName] [nvarchar](255) NULL,
// 	[color] [nvarchar](255) NULL,
//  CONSTRAINT [PK_fb2e442d14add3cefbdf33c4561] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  View [dbo].[V_DashBoardOrders]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO





// CREATE     VIEW [dbo].[V_DashBoardOrders]
// AS
// SELECT 
// 		rr.role	
//       ,ts.status
//       ,(select count(*) from [compulockOrders].[dbo].[order] ord where  rr.id = ord.roleId and ts.id=ord.taskStatusId ) as countStatus
//   FROM  
// 	   [compulockOrders].[dbo].[role] rr,
// 	   [compulockOrders].[dbo].[task_status] ts

// GO
// /****** Object:  Table [dbo].[boxsize]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[boxsize](
// 	[id] [int] IDENTITY(1,1) NOT NULL,
// 	[sizeDesc] [nvarchar](255) NOT NULL,
//  CONSTRAINT [PK_b8747cc6a41b6cef4639babf6sd] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[orderHist]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[orderHist](
// 	[id] [uniqueidentifier] NOT NULL,
// 	[OrgId] [uniqueidentifier] NOT NULL,
// 	[CUSTNAME] [nvarchar](255) NOT NULL,
// 	[CUSTNO] [nvarchar](255) NOT NULL,
// 	[ORDNAME] [nvarchar](255) NOT NULL,
// 	[STCODE] [nvarchar](255) NOT NULL,
// 	[STDES] [nvarchar](255) NOT NULL,
// 	[created_at] [datetime2](7) NOT NULL,
// 	[updated_at] [datetime2](7) NOT NULL,
// 	[userId] [int] NULL,
// 	[taskStatusId] [int] NULL,
// 	[orderRemarks] [nvarchar](255) NULL,
// 	[ADDRESS] [nvarchar](255) NULL,
// 	[ADDRESS2] [nvarchar](255) NULL,
// 	[ADDRESS3] [nvarchar](255) NULL,
// 	[STATE] [nvarchar](255) NULL,
// 	[STATECODE] [nvarchar](255) NULL,
// 	[STATENAME] [nvarchar](255) NULL,
// 	[ZIP] [nvarchar](255) NULL,
// 	[COUNTRYNAME] [nvarchar](255) NULL,
// 	[roleId] [int] NULL,
// 	[CURDATE] [nvarchar](255) NULL,
// 	[OrderText] [nvarchar](255) NULL,
// 	[orderPhotoBase64] [text] NULL,
// 	[orderPhotoBase64_1] [text] NULL,
// 	[orderPhotoBase64_2] [text] NULL,
// 	[priorityOrder] [int] NULL
// ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[report_view]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[report_view](
// 	[id] [int] IDENTITY(1,1) NOT NULL,
// 	[reportName] [nvarchar](255) NULL,
// 	[reportTitleName] [nvarchar](255) NULL,
//  CONSTRAINT [PK_d1f12b6a1b3e32bffc529545113] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[task_Assembly ]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[task_Assembly ](
// 	[PKGUID] [uniqueidentifier] NOT NULL,
// 	[id] [int] IDENTITY(1,1) NOT NULL,
// 	[taskData] [nvarchar](255) NOT NULL,
// 	[PartNumber] [nvarchar](255) NULL,
// 	[QTYtoAssemble] [int] NULL,
// 	[QTYassembled] [int] NULL,
// 	[userId] [int] NULL,
// 	[taskStatusId] [int] NULL,
// 	[created_at] [datetime2](7) NOT NULL,
// 	[updated_at] [datetime2](7) NOT NULL,
//  CONSTRAINT [PK_task_Assembly ] PRIMARY KEY CLUSTERED 
// (
// 	[PKGUID] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// /****** Object:  Table [dbo].[users_roles]    Script Date: 11/10/2024 15:00:54 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[users_roles](
// 	[id] [int] IDENTITY(1,1) NOT NULL,
// 	[usersId] [int] NULL,
// 	[roleId] [int] NULL,
//  CONSTRAINT [PK_1d8dd7ffa37c3ab0c4eefb0b221] PRIMARY KEY CLUSTERED 
// (
// 	[id] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// SET IDENTITY_INSERT [dbo].[boxsize] ON 
// GO
// INSERT [dbo].[boxsize] ([id], [sizeDesc]) VALUES (1, N'10 * 10 * 10')
// GO
// INSERT [dbo].[boxsize] ([id], [sizeDesc]) VALUES (2, N'20 * 20 * 20')
// GO
// INSERT [dbo].[boxsize] ([id], [sizeDesc]) VALUES (3, N'30 * 30 * 30')
// GO
// INSERT [dbo].[boxsize] ([id], [sizeDesc]) VALUES (4, N'60 * 60 * 60')
// GO
// INSERT [dbo].[boxsize] ([id], [sizeDesc]) VALUES (5, N'100 * 100 *100')
// GO
// INSERT [dbo].[boxsize] ([id], [sizeDesc]) VALUES (6, N'200 * 200 * 200')
// GO
// SET IDENTITY_INSERT [dbo].[boxsize] OFF
// GO
// INSERT [dbo].[order] ([id], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'7c8e0349-f386-ef11-9f69-5cc5d4460392', N'BILLINGTON STRUCTURES', N'UK409001', N'SO24E03854', N'A1', N'Standard Delivery', CAST(N'2024-10-10T13:34:54.1900000' AS DateTime2), CAST(N'2024-10-10T19:26:18.5400000' AS DateTime2), 8, 5, NULL, N'BARNSLEY ROAD, WOMBWELL', NULL, NULL, N'BARNSLEY', NULL, NULL, N'S73 8DS', N'United Kingdom', 4, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[order] ([id], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'7d8e0349-f386-ef11-9f69-5cc5d4460392', N'Niall Beard', N'UK409001', N'SO24E03855', N'A1', N'Standard Delivery', CAST(N'2024-10-10T13:34:54.2000000' AS DateTime2), CAST(N'2024-10-10T13:34:54.2000000' AS DateTime2), 1, 1, NULL, N'Manchester Communication Academy', N'Harpurhey', NULL, N'Manchester', N'ENG', N'England', N'M40 8NT', N'United Kingdom', 1, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[order] ([id], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'd151366e-2487-ef11-9f69-5cc5d4460392', N'Ets François Matériaux', N'EU409001', N'SO24E03862', N'A1', N'Standard Delivery', CAST(N'2024-10-10T19:26:41.9400000' AS DateTime2), CAST(N'2024-10-10T19:26:41.9400000' AS DateTime2), 1, 1, NULL, N'1440 Route d''Etretat', NULL, NULL, N'Heuqueville', N'Normandie', N'Normandie', N'76280', N'France', 1, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[order] ([id], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'd251366e-2487-ef11-9f69-5cc5d4460392', N'Marco Vesper', N'EU409001', N'SO24E03861', N'A1', N'Standard Delivery', CAST(N'2024-10-10T19:26:41.9433333' AS DateTime2), CAST(N'2024-10-10T19:26:41.9433333' AS DateTime2), 1, 1, NULL, N'Auf der Gaßhecke 22', N'Auf der Gaßhecke 22 22', NULL, N'Lichtenfels', N'HE', N'Hessen', N'35104', N'Germany', 1, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[order] ([id], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'd351366e-2487-ef11-9f69-5cc5d4460392', N'SCO ApS  Tax DK26363616', N'EU409001', N'SO24E03860', N'A1', N'Standard Delivery', CAST(N'2024-10-10T19:26:41.9533333' AS DateTime2), CAST(N'2024-10-10T19:26:41.9533333' AS DateTime2), 1, 1, NULL, N'Bygstubben 12', NULL, NULL, N'Vedbæk', NULL, NULL, N'2950', N'Denmark', 1, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[order] ([id], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'd451366e-2487-ef11-9f69-5cc5d4460392', N'TD UK', N'12119018', N'SO24E03857', N'EXP', N'Expeditors', CAST(N'2024-10-10T19:26:41.9566667' AS DateTime2), CAST(N'2024-10-10T19:26:41.9566667' AS DateTime2), 1, 1, NULL, N'TD SYNNEX Supply Chain Services Ltd.', N'C/O TD SYNNEX UK Limited', N'Harrier Parkway, Magna Park VAT: GB552014679', N'LUTTERWORTH', NULL, NULL, N'LE17 4XT', N'United Kingdom', 1, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[order] ([id], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'd551366e-2487-ef11-9f69-5cc5d4460392', N'TD BOR', N'12119018', N'SO24E03859', N'SH', N'Schenker', CAST(N'2024-10-10T19:26:41.9600000' AS DateTime2), CAST(N'2024-10-10T19:26:41.9600000' AS DateTime2), 1, 1, NULL, N'TD SYNNEX Supply Chain Services Ltd.', N'C/O TD SYNNEX Czech s.r.o.', N'CT Park Nova Hospoda 18, VAT: CZ682532768', N'BOR', NULL, NULL, N'34802', N'Czechia', 1, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[order_Boxes] ([id], [boxSizeId], [boxNo], [boxweight], [lineRemarks], [orderId]) VALUES (N'78bb7f4d-2487-ef11-9f69-5cc5d4460392', 1, 1, 1, N'', N'7c8e0349-f386-ef11-9f69-5cc5d4460392')
// GO
// INSERT [dbo].[order_Boxes] ([id], [boxSizeId], [boxNo], [boxweight], [lineRemarks], [orderId]) VALUES (N'07e34760-2487-ef11-9f69-5cc5d4460392', 1, 1, 1, N'', N'7c8e0349-f386-ef11-9f69-5cc5d4460392')
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'b2d3a97d-f486-ef11-9f69-5cc5d4460392', N'827B', N'VESA Swing Arm Mount', 1, N'854340005504', NULL, CAST(N'2024-10-10T13:43:32.0233333' AS DateTime2), CAST(N'2024-10-10T13:43:32.0233333' AS DateTime2), N'7d8e0349-f386-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'b3d3a97d-f486-ef11-9f69-5cc5d4460392', N'DGSGTA9P', N'Galaxy Tab A9 Plus 11" Tempered Glass Screen Protector', 1, N'810157340016', NULL, CAST(N'2024-10-10T13:43:32.0300000' AS DateTime2), CAST(N'2024-10-10T13:43:32.0300000' AS DateTime2), N'7d8e0349-f386-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'b4d3a97d-f486-ef11-9f69-5cc5d4460392', N'11GAPX9B', N'Apex Galaxy Tab A9+ 11" Secured Enclosure', 4, N'810157340207', NULL, CAST(N'2024-10-10T13:43:32.0533333' AS DateTime2), CAST(N'2024-10-10T19:26:18.5533333' AS DateTime2), N'7c8e0349-f386-ef11-9f69-5cc5d4460392', 1, 4, 1, 1)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'b5d3a97d-f486-ef11-9f69-5cc5d4460392', N'11GAPX9B', N'Apex Galaxy Tab A9+ 11" Secured Enclosure', 1, N'810157340207', NULL, CAST(N'2024-10-10T13:43:32.0566667' AS DateTime2), CAST(N'2024-10-10T13:43:32.0566667' AS DateTime2), N'7d8e0349-f386-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'b6d3a97d-f486-ef11-9f69-5cc5d4460392', N'6FTALLUSBC', N'6ft USB-C to USB-C 90-Degree 2.0 Charge and Data', 1, N'819472023758', NULL, CAST(N'2024-10-10T13:43:32.0733333' AS DateTime2), CAST(N'2024-10-10T13:43:32.0733333' AS DateTime2), N'7d8e0349-f386-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'd651366e-2487-ef11-9f69-5cc5d4460392', N'CL15', N'Keyed T-bar Cable Lock', 1, N'856282004003', NULL, CAST(N'2024-10-10T19:26:42.3866667' AS DateTime2), CAST(N'2024-10-10T19:26:42.3866667' AS DateTime2), N'd151366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'd751366e-2487-ef11-9f69-5cc5d4460392', N'HOVERTAB', N'HoverTab Security Tablet Lock Stand Silver', 1, N'854340005276', NULL, CAST(N'2024-10-10T19:26:42.3866667' AS DateTime2), CAST(N'2024-10-10T19:26:42.3866667' AS DateTime2), N'd151366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'd851366e-2487-ef11-9f69-5cc5d4460392', N'333W209SWLW', N'iPad 10.9" 10th Gen Swell Enclosure Mast Counter Stand', 1, N'810157342430', NULL, CAST(N'2024-10-10T19:26:42.4100000' AS DateTime2), CAST(N'2024-10-10T19:26:42.4100000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'd951366e-2487-ef11-9f69-5cc5d4460392', N'201M', N'Wall Mount Bracket with Security Slot', 1, N'819472023147', NULL, CAST(N'2024-10-10T19:26:42.4266667' AS DateTime2), CAST(N'2024-10-10T19:26:42.4266667' AS DateTime2), N'd251366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'da51366e-2487-ef11-9f69-5cc5d4460392', N'147W', N'Adjustable Security Floor Stand', 1, N'854340005535', NULL, CAST(N'2024-10-10T19:26:42.4333333' AS DateTime2), CAST(N'2024-10-10T19:26:42.4333333' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'db51366e-2487-ef11-9f69-5cc5d4460392', N'VHBMM01', N'Universal Tablet Magnetic Mount, VESA Compatible', 1, N'819472023024', NULL, CAST(N'2024-10-10T19:26:42.4400000' AS DateTime2), CAST(N'2024-10-10T19:26:42.4400000' AS DateTime2), N'd251366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'dc51366e-2487-ef11-9f69-5cc5d4460392', N'102IPDSW', N'Space iPad 10.2" Secured Enclosure', 1, N'819472022492', NULL, CAST(N'2024-10-10T19:26:42.4500000' AS DateTime2), CAST(N'2024-10-10T19:26:42.4500000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'dd51366e-2487-ef11-9f69-5cc5d4460392', N'TCDP01', N'VESA Tilting Kiosk Stand 8" with Cable Management', 1, N'854340005023', NULL, CAST(N'2024-10-10T19:26:42.4666667' AS DateTime2), CAST(N'2024-10-10T19:26:42.4666667' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'de51366e-2487-ef11-9f69-5cc5d4460392', N'CL15UTL', N'Universal Keyed Cable Lock with 3M Plate', 2, N'856282004058', NULL, CAST(N'2024-10-10T19:26:42.4700000' AS DateTime2), CAST(N'2024-10-10T19:26:42.4700000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'df51366e-2487-ef11-9f69-5cc5d4460392', N'TCDP04', N'VESA Tilting Kiosk Stand 4" with Cable Management', 3, N'857083006722', NULL, CAST(N'2024-10-10T19:26:42.4800000' AS DateTime2), CAST(N'2024-10-10T19:26:42.4800000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e051366e-2487-ef11-9f69-5cc5d4460392', N'147B', N'Adjustable Security Floor Stand', 4, N'854340005528', NULL, CAST(N'2024-10-10T19:26:42.4800000' AS DateTime2), CAST(N'2024-10-10T19:26:42.4800000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e151366e-2487-ef11-9f69-5cc5d4460392', N'109GAPXB', N'Apex Galaxy Tab S9FE 10.9" and S9 11" Secured Enclosure', 4, N'810157340214', NULL, CAST(N'2024-10-10T19:26:42.5200000' AS DateTime2), CAST(N'2024-10-10T19:26:42.5200000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e251366e-2487-ef11-9f69-5cc5d4460392', N'827B', N'VESA Swing Arm Mount', 4, N'854340005504', NULL, CAST(N'2024-10-10T19:26:42.6633333' AS DateTime2), CAST(N'2024-10-10T19:26:42.6633333' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e351366e-2487-ef11-9f69-5cc5d4460392', N'111W', N'VESA Fixed 45 Degree Core Counter Stand or Wall Mount White', 2, N'819472028562', NULL, CAST(N'2024-10-10T19:26:42.7000000' AS DateTime2), CAST(N'2024-10-10T19:26:42.7000000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e451366e-2487-ef11-9f69-5cc5d4460392', N'DGIPMN06', N'iPad mini 8.3" Tempered Glass Screen Protector', 2, N'819472023864', NULL, CAST(N'2024-10-10T19:26:42.7166667' AS DateTime2), CAST(N'2024-10-10T19:26:42.7166667' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e551366e-2487-ef11-9f69-5cc5d4460392', N'DGSGTA9P', N'Galaxy Tab A9 Plus 11" Tempered Glass Screen Protector', 7, N'810157340016', NULL, CAST(N'2024-10-10T19:26:42.7233333' AS DateTime2), CAST(N'2024-10-10T19:26:42.7233333' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e651366e-2487-ef11-9f69-5cc5d4460392', N'510GOSB', N'Surface Go (1-4 Gen) Space Enclosure Wall Mount Black', 3, N'819472022805', NULL, CAST(N'2024-10-10T19:26:42.7300000' AS DateTime2), CAST(N'2024-10-10T19:26:42.7300000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e751366e-2487-ef11-9f69-5cc5d4460392', N'11GAPX9B', N'Apex Galaxy Tab A9+ 11" Secured Enclosure', 35, N'810157340207', NULL, CAST(N'2024-10-10T19:26:42.7400000' AS DateTime2), CAST(N'2024-10-10T19:26:42.7400000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e851366e-2487-ef11-9f69-5cc5d4460392', N'DGSPRO', N'Surface Pro 9-11 Gen 13" Tempered Glass Screen Protector', 5, N'810157340030', NULL, CAST(N'2024-10-10T19:26:42.7666667' AS DateTime2), CAST(N'2024-10-10T19:26:42.7666667' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'e951366e-2487-ef11-9f69-5cc5d4460392', N'660REACH209IPDSB', N'Reach Space iPad 10.9" 10th Gen. Monitor Arm', 1, N'819472026629', NULL, CAST(N'2024-10-10T19:26:42.7733333' AS DateTime2), CAST(N'2024-10-10T19:26:42.7733333' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'ea51366e-2487-ef11-9f69-5cc5d4460392', N'580SPSB', N'Space MS Surface Pro 13" 8-9 Gen Secured Enclosure', 3, N'819472024212', NULL, CAST(N'2024-10-10T19:26:42.7966667' AS DateTime2), CAST(N'2024-10-10T19:26:42.7966667' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'eb51366e-2487-ef11-9f69-5cc5d4460392', N'580APXB', N'Apex MS Surface Pro 13" 8-11 Gen Secured Enclosure', 2, N'810157340245', NULL, CAST(N'2024-10-10T19:26:42.8000000' AS DateTime2), CAST(N'2024-10-10T19:26:42.8000000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'ec51366e-2487-ef11-9f69-5cc5d4460392', N'BNDTA9', N'Rugged Edge Case for Galaxy Tab A9 8.7"', 9, N'810157341006', NULL, CAST(N'2024-10-10T19:26:42.8366667' AS DateTime2), CAST(N'2024-10-10T19:26:42.8366667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'ed51366e-2487-ef11-9f69-5cc5d4460392', N'BNDTA9P', N'Rugged Edge Case for Galaxy Tab A9+ 11"', 27, N'810157341013', NULL, CAST(N'2024-10-10T19:26:42.9200000' AS DateTime2), CAST(N'2024-10-10T19:26:42.9200000' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'ee51366e-2487-ef11-9f69-5cc5d4460392', N'147B', N'Adjustable Security Floor Stand', 7, N'854340005528', NULL, CAST(N'2024-10-10T19:26:42.9333333' AS DateTime2), CAST(N'2024-10-10T19:26:42.9333333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'ef51366e-2487-ef11-9f69-5cc5d4460392', N'147W', N'Adjustable Security Floor Stand', 3, N'854340005535', NULL, CAST(N'2024-10-10T19:26:42.9466667' AS DateTime2), CAST(N'2024-10-10T19:26:42.9466667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f051366e-2487-ef11-9f69-5cc5d4460392', N'LK01-EU', N'Lightning Kit for BrandMe Stand with EU Power Cord', 3, N'810157342034', NULL, CAST(N'2024-10-10T19:26:42.9466667' AS DateTime2), CAST(N'2024-10-10T19:26:42.9466667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f151366e-2487-ef11-9f69-5cc5d4460392', N'CL15', N'Keyed T-bar Cable Lock', 2, N'856282004003', NULL, CAST(N'2024-10-10T19:26:42.9533333' AS DateTime2), CAST(N'2024-10-10T19:26:42.9533333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f251366e-2487-ef11-9f69-5cc5d4460392', N'209SWLB', N'iPad 10.9" 10th Gen Swell Enclosure Wall Mount Black', 2, N'819472029156', NULL, CAST(N'2024-10-10T19:26:42.9600000' AS DateTime2), CAST(N'2024-10-10T19:26:42.9600000' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f351366e-2487-ef11-9f69-5cc5d4460392', N'209SWLW', N'iPad 10.9" 10th Gen Swell Enclosure Wall Mount White', 3, N'819472029163', NULL, CAST(N'2024-10-10T19:26:42.9666667' AS DateTime2), CAST(N'2024-10-10T19:26:42.9666667' AS DateTime2), N'd451366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f451366e-2487-ef11-9f69-5cc5d4460392', N'MMEN76', N'Mac mini Security Mount', 13, N'856282004362', NULL, CAST(N'2024-10-10T19:26:42.9733333' AS DateTime2), CAST(N'2024-10-10T19:26:42.9733333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f551366e-2487-ef11-9f69-5cc5d4460392', N'TCDP01', N'VESA Tilting Kiosk Stand 8" with Cable Management', 5, N'854340005023', NULL, CAST(N'2024-10-10T19:26:42.9866667' AS DateTime2), CAST(N'2024-10-10T19:26:42.9866667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f651366e-2487-ef11-9f69-5cc5d4460392', N'140W13APXW', N'iPad Air M2 13" (2024) Apex Enclosure Brandable Floor Stand', 3, N'810157341501', NULL, CAST(N'2024-10-10T19:26:42.9933333' AS DateTime2), CAST(N'2024-10-10T19:26:42.9933333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f751366e-2487-ef11-9f69-5cc5d4460392', N'TCDP04', N'VESA Tilting Kiosk Stand 4" with Cable Management', 2, N'857083006722', NULL, CAST(N'2024-10-10T19:26:43.0000000' AS DateTime2), CAST(N'2024-10-10T19:26:43.0000000' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f851366e-2487-ef11-9f69-5cc5d4460392', N'UCLGSTDW', N'Cling 2.0 Universal Tablet Security Stand', 1, N'854249006800', NULL, CAST(N'2024-10-10T19:26:43.0133333' AS DateTime2), CAST(N'2024-10-10T19:26:43.0133333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'f951366e-2487-ef11-9f69-5cc5d4460392', N'102IPDSB', N'Space iPad 10.2" Secured Enclosure', 15, N'819472022485', NULL, CAST(N'2024-10-10T19:26:43.0366667' AS DateTime2), CAST(N'2024-10-10T19:26:43.0366667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'fa51366e-2487-ef11-9f69-5cc5d4460392', N'10PUSBDKS-EU', N'10 Port USB Multiple Tablet Charging Station.EU', 15, N'819472021846', NULL, CAST(N'2024-10-10T19:26:43.0366667' AS DateTime2), CAST(N'2024-10-10T19:26:43.0366667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'fb51366e-2487-ef11-9f69-5cc5d4460392', N'MNTX341B', N'Magnetix Secured Tablet Capsule', 1, N'819472023246', NULL, CAST(N'2024-10-10T19:26:43.0433333' AS DateTime2), CAST(N'2024-10-10T19:26:43.0433333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'fc51366e-2487-ef11-9f69-5cc5d4460392', N'510GOSB', N'Surface Go (1-4 Gen) Space Enclosure Wall Mount Black', 27, N'819472022805', NULL, CAST(N'2024-10-10T19:26:43.0433333' AS DateTime2), CAST(N'2024-10-10T19:26:43.0433333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'fd51366e-2487-ef11-9f69-5cc5d4460392', N'209IPDSB', N'Space iPad 10.9" 10th Gen. Secured Enclosure', 7, N'819472024724', NULL, CAST(N'2024-10-10T19:26:43.0566667' AS DateTime2), CAST(N'2024-10-10T19:26:43.0566667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'fe51366e-2487-ef11-9f69-5cc5d4460392', N'299PSENB', N'Space iPad Pro 12.9" 3-6 Gen. Sec. Enclosure', 4, N'819472022263', NULL, CAST(N'2024-10-10T19:26:43.0566667' AS DateTime2), CAST(N'2024-10-10T19:26:43.0566667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'ff51366e-2487-ef11-9f69-5cc5d4460392', N'189BGRPLCK', N'Universal Tablet Grip and Security Stand', 9, N'854249006015', NULL, CAST(N'2024-10-10T19:26:43.0633333' AS DateTime2), CAST(N'2024-10-10T19:26:43.0633333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0052366e-2487-ef11-9f69-5cc5d4460392', N'102IPDSW', N'Space iPad 10.2" Secured Enclosure', 1, N'819472022492', NULL, CAST(N'2024-10-10T19:26:43.0633333' AS DateTime2), CAST(N'2024-10-10T19:26:43.0633333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0152366e-2487-ef11-9f69-5cc5d4460392', N'MBPR16LDG02CL', N'Macbook Pro 16" 2021 Combination Cable Ledge Lock', 10, N'819472024373', NULL, CAST(N'2024-10-10T19:26:43.0866667' AS DateTime2), CAST(N'2024-10-10T19:26:43.0866667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0252366e-2487-ef11-9f69-5cc5d4460392', N'830IPMSB', N'iPad mini 8.3" Space Enclosure Wall Mount Black', 1, N'819472024151', NULL, CAST(N'2024-10-10T19:26:43.1033333' AS DateTime2), CAST(N'2024-10-10T19:26:43.1033333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0352366e-2487-ef11-9f69-5cc5d4460392', N'MBPR16LDG01KL', N'Ledge Lock Adapter for MacBook Pro 16" (2019) with CL15', 12, N'819472022560', NULL, CAST(N'2024-10-10T19:26:43.1300000' AS DateTime2), CAST(N'2024-10-10T19:26:43.1300000' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0452366e-2487-ef11-9f69-5cc5d4460392', N'DGIPD109', N'iPad 10.9" 10th Gen Tempered Glass Screen Protector', 7, N'819472024809', NULL, CAST(N'2024-10-10T19:26:43.1466667' AS DateTime2), CAST(N'2024-10-10T19:26:43.1466667' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0552366e-2487-ef11-9f69-5cc5d4460392', N'209SWLB', N'iPad 10.9" 10th Gen Swell Enclosure Wall Mount Black', 4, N'819472029156', NULL, CAST(N'2024-10-10T19:26:43.1533333' AS DateTime2), CAST(N'2024-10-10T19:26:43.1533333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0652366e-2487-ef11-9f69-5cc5d4460392', N'MSLDG01KL', N'Mac Studio Keyed Cable Ledge Lock', 2, N'819472024465', NULL, CAST(N'2024-10-10T19:26:43.1600000' AS DateTime2), CAST(N'2024-10-10T19:26:43.1600000' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0752366e-2487-ef11-9f69-5cc5d4460392', N'209SWLW', N'iPad 10.9" 10th Gen Swell Enclosure Wall Mount White', 3, N'819472029163', NULL, CAST(N'2024-10-10T19:26:43.1600000' AS DateTime2), CAST(N'2024-10-10T19:26:43.1600000' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0852366e-2487-ef11-9f69-5cc5d4460392', N'DGSGO', N'Surface GO 2-4 10.5" Tempered Glass Screen Protector', 8, N'810157340047', NULL, CAST(N'2024-10-10T19:26:43.1700000' AS DateTime2), CAST(N'2024-10-10T19:26:43.1700000' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0952366e-2487-ef11-9f69-5cc5d4460392', N'DGSPRO', N'Surface Pro 9-11 Gen 13" Tempered Glass Screen Protector', 13, N'810157340030', NULL, CAST(N'2024-10-10T19:26:43.1700000' AS DateTime2), CAST(N'2024-10-10T19:26:43.1700000' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0a52366e-2487-ef11-9f69-5cc5d4460392', N'SMP01B', N'Universal Invisible Mount Plate', 10, N'819472024182', NULL, CAST(N'2024-10-10T19:26:43.1733333' AS DateTime2), CAST(N'2024-10-10T19:26:43.1733333' AS DateTime2), N'd351366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0b52366e-2487-ef11-9f69-5cc5d4460392', N'MBPR14LDG01KL', N'MacBook Pro 14" 2021 Keyed Cable Ledge Lock', 11, N'819472024335', NULL, CAST(N'2024-10-10T19:26:43.1833333' AS DateTime2), CAST(N'2024-10-10T19:26:43.1833333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0c52366e-2487-ef11-9f69-5cc5d4460392', N'DGSGTA9P', N'Galaxy Tab A9 Plus 11" Tempered Glass Screen Protector', 12, N'810157340016', NULL, CAST(N'2024-10-10T19:26:43.1833333' AS DateTime2), CAST(N'2024-10-10T19:26:43.1833333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0d52366e-2487-ef11-9f69-5cc5d4460392', N'DGSGTS9FE', N'Galaxy Tab S9FE 10.9" Tempered Glass Screen Protector', 2, N'810157340023', NULL, CAST(N'2024-10-10T19:26:43.1933333' AS DateTime2), CAST(N'2024-10-10T19:26:43.1933333' AS DateTime2), N'd551366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[order_line] ([id], [PARTNAME], [PARTDES], [TBALANCE], [BARCODE], [lineRemarks], [created_at], [updated_at], [orderId], [taskStatusId], [Fullfilled], [approved], [pickingError]) VALUES (N'0e52366e-2487-ef11-9f69-5cc5d4460392', N'ENWMB', N'Wall Mount Bracket w/ cable management', 10, N'819472020559', NULL, CAST(N'2024-10-10T19:26:43.1966667' AS DateTime2), CAST(N'2024-10-10T19:26:43.1966667' AS DateTime2), N'd351366e-2487-ef11-9f69-5cc5d4460392', 1, 0, 0, 0)
// GO
// INSERT [dbo].[orderHist] ([id], [OrgId], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'9ae5d012-d0e3-46e6-9e69-294a9ac62e52', N'7c8e0349-f386-ef11-9f69-5cc5d4460392', N'BILLINGTON STRUCTURES', N'UK409001', N'SO24E03854', N'A1', N'Standard Delivery', CAST(N'2024-10-10T13:34:54.1900000' AS DateTime2), CAST(N'2024-10-10T19:02:28.0133333' AS DateTime2), 8, 5, NULL, N'BARNSLEY ROAD, WOMBWELL', NULL, NULL, N'BARNSLEY', NULL, NULL, N'S73 8DS', N'United Kingdom', 2, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[orderHist] ([id], [OrgId], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'ee22ab3b-c0ac-4f26-88ee-f8a7d81f7410', N'7c8e0349-f386-ef11-9f69-5cc5d4460392', N'BILLINGTON STRUCTURES', N'UK409001', N'SO24E03854', N'A1', N'Standard Delivery', CAST(N'2024-10-10T13:34:54.1900000' AS DateTime2), CAST(N'2024-10-10T19:25:47.0233333' AS DateTime2), 8, 5, NULL, N'BARNSLEY ROAD, WOMBWELL', NULL, NULL, N'BARNSLEY', NULL, NULL, N'S73 8DS', N'United Kingdom', 3, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// INSERT [dbo].[orderHist] ([id], [OrgId], [CUSTNAME], [CUSTNO], [ORDNAME], [STCODE], [STDES], [created_at], [updated_at], [userId], [taskStatusId], [orderRemarks], [ADDRESS], [ADDRESS2], [ADDRESS3], [STATE], [STATECODE], [STATENAME], [ZIP], [COUNTRYNAME], [roleId], [CURDATE], [OrderText], [orderPhotoBase64], [orderPhotoBase64_1], [orderPhotoBase64_2], [priorityOrder]) VALUES (N'5642c546-a983-4538-8dce-d51430ec8a1a', N'7c8e0349-f386-ef11-9f69-5cc5d4460392', N'BILLINGTON STRUCTURES', N'UK409001', N'SO24E03854', N'A1', N'Standard Delivery', CAST(N'2024-10-10T13:34:54.1900000' AS DateTime2), CAST(N'2024-10-10T19:26:18.5400000' AS DateTime2), 8, 5, NULL, N'BARNSLEY ROAD, WOMBWELL', NULL, NULL, N'BARNSLEY', NULL, NULL, N'S73 8DS', N'United Kingdom', 4, N'2024-10-10T00:00:00+03:00', NULL, NULL, NULL, NULL, 100)
// GO
// SET IDENTITY_INSERT [dbo].[report_view] ON 
// GO
// INSERT [dbo].[report_view] ([id], [reportName], [reportTitleName]) VALUES (1, N'V_all_tasks_Assembly', N'get all Assembly tasks')
// GO
// INSERT [dbo].[report_view] ([id], [reportName], [reportTitleName]) VALUES (2, N'V_all_tasks_inventory_count', N'get all inventory count tasks')
// GO
// INSERT [dbo].[report_view] ([id], [reportName], [reportTitleName]) VALUES (3, N'V_all_tasks_good_recived', N'get all good reciveed tasks')
// GO
// INSERT [dbo].[report_view] ([id], [reportName], [reportTitleName]) VALUES (4, N'V_all_tasks_warehouse', N'get all warehouse tasks')
// GO
// INSERT [dbo].[report_view] ([id], [reportName], [reportTitleName]) VALUES (5, N'v_report_orders', N'get orders')
// GO
// SET IDENTITY_INSERT [dbo].[report_view] OFF
// GO
// SET IDENTITY_INSERT [dbo].[role] ON 
// GO
// INSERT [dbo].[role] ([id], [role], [roleDisplayName], [color]) VALUES (1, N'Picker', NULL, N'lightgreen')
// GO
// INSERT [dbo].[role] ([id], [role], [roleDisplayName], [color]) VALUES (2, N'Supervisior', NULL, N'yellow')
// GO
// INSERT [dbo].[role] ([id], [role], [roleDisplayName], [color]) VALUES (3, N'Packer', NULL, N'orange')
// GO
// INSERT [dbo].[role] ([id], [role], [roleDisplayName], [color]) VALUES (4, N'Shipper', NULL, N'lightBlue')
// GO
// INSERT [dbo].[role] ([id], [role], [roleDisplayName], [color]) VALUES (6, N'Administartor', NULL, N'grey')
// GO
// SET IDENTITY_INSERT [dbo].[role] OFF
// GO
// SET IDENTITY_INSERT [dbo].[task_Assembly ] ON 
// GO
// INSERT [dbo].[task_Assembly ] ([PKGUID], [id], [taskData], [PartNumber], [QTYtoAssemble], [QTYassembled], [userId], [taskStatusId], [created_at], [updated_at]) VALUES (N'e03e0613-ada2-4071-a921-5f09900d31e3', 4, N'na', N'hhh', 0, 0, 4, 1, CAST(N'2024-08-07T11:17:47.2266667' AS DateTime2), CAST(N'2024-08-07T11:17:47.2266667' AS DateTime2))
// GO
// INSERT [dbo].[task_Assembly ] ([PKGUID], [id], [taskData], [PartNumber], [QTYtoAssemble], [QTYassembled], [userId], [taskStatusId], [created_at], [updated_at]) VALUES (N'14e1b7ea-19c8-4488-b14b-aeeb78ea3714', 5, N'na', N'dsfsssss', 0, 0, 1, 1, CAST(N'2024-08-07T11:19:10.4866667' AS DateTime2), CAST(N'2024-08-07T11:19:10.4866667' AS DateTime2))
// GO
// INSERT [dbo].[task_Assembly ] ([PKGUID], [id], [taskData], [PartNumber], [QTYtoAssemble], [QTYassembled], [userId], [taskStatusId], [created_at], [updated_at]) VALUES (N'29abf411-e951-4819-a3f5-e02b6fe63e0d', 1, N'na', N'lkulhlk', 0, 0, 1, 1, CAST(N'2024-08-07T11:17:06.2766667' AS DateTime2), CAST(N'2024-08-07T11:17:06.2766667' AS DateTime2))
// GO
// SET IDENTITY_INSERT [dbo].[task_Assembly ] OFF
// GO
// SET IDENTITY_INSERT [dbo].[task_status] ON 
// GO
// INSERT [dbo].[task_status] ([id], [status], [color]) VALUES (1, N'New', N'yellow    ')
// GO
// INSERT [dbo].[task_status] ([id], [status], [color]) VALUES (2, N'In Progress', N'orange    ')
// GO
// INSERT [dbo].[task_status] ([id], [status], [color]) VALUES (5, N'Complete', N'green     ')
// GO
// INSERT [dbo].[task_status] ([id], [status], [color]) VALUES (6, N'Pending', N'red       ')
// GO
// SET IDENTITY_INSERT [dbo].[task_status] OFF
// GO
// SET IDENTITY_INSERT [dbo].[task_type] ON 
// GO
// INSERT [dbo].[task_type] ([id], [role]) VALUES (1, N'Assembly')
// GO
// INSERT [dbo].[task_type] ([id], [role]) VALUES (2, N'Inventory count')
// GO
// INSERT [dbo].[task_type] ([id], [role]) VALUES (3, N'Good received')
// GO
// INSERT [dbo].[task_type] ([id], [role]) VALUES (4, N'Warehouse changes')
// GO
// INSERT [dbo].[task_type] ([id], [role]) VALUES (5, N'Assembly Order')
// GO
// SET IDENTITY_INSERT [dbo].[task_type] OFF
// GO
// INSERT [dbo].[task_user] ([id], [DataInfo], [PartNumber], [QTYtoassemble], [QTYassembled], [Total], [BIN], [QTY], [BIN_1], [QTY_1], [BIN_2], [QTY_2], [Supplier], [PalletNumber], [PO], [taskInfo], [NoOfBoxes], [NoOfItems], [Color], [created_at], [updated_at], [taskTypeId], [userId], [taskStatusId], [orderName]) VALUES (N'fcf4cca5-a666-4e58-8db4-084656e04e8d', N'na', N'Pa123-44444444', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'pp-123456', N'na', N'na', N'na', N'na', NULL, CAST(N'2024-10-10T16:24:31.6633333' AS DateTime2), CAST(N'2024-10-10T16:24:31.6633333' AS DateTime2), 2, 8, 1, NULL)
// GO
// INSERT [dbo].[task_user] ([id], [DataInfo], [PartNumber], [QTYtoassemble], [QTYassembled], [Total], [BIN], [QTY], [BIN_1], [QTY_1], [BIN_2], [QTY_2], [Supplier], [PalletNumber], [PO], [taskInfo], [NoOfBoxes], [NoOfItems], [Color], [created_at], [updated_at], [taskTypeId], [userId], [taskStatusId], [orderName]) VALUES (N'57891881-fffc-472f-84c3-c4f58d09e614', N'na', N'Pa123555', N'25', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', NULL, CAST(N'2024-10-10T16:27:26.6666667' AS DateTime2), CAST(N'2024-10-10T16:27:26.6666667' AS DateTime2), 1, 4, 1, NULL)
// GO
// INSERT [dbo].[task_user] ([id], [DataInfo], [PartNumber], [QTYtoassemble], [QTYassembled], [Total], [BIN], [QTY], [BIN_1], [QTY_1], [BIN_2], [QTY_2], [Supplier], [PalletNumber], [PO], [taskInfo], [NoOfBoxes], [NoOfItems], [Color], [created_at], [updated_at], [taskTypeId], [userId], [taskStatusId], [orderName]) VALUES (N'acc68e63-126c-4e01-a5ac-cdb3d71dfb49', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'pppppp', N'na', N'na', N'na', N'na', NULL, CAST(N'2024-10-10T16:22:42.6900000' AS DateTime2), CAST(N'2024-10-10T16:22:42.6900000' AS DateTime2), 2, 8, 1, NULL)
// GO
// INSERT [dbo].[task_user] ([id], [DataInfo], [PartNumber], [QTYtoassemble], [QTYassembled], [Total], [BIN], [QTY], [BIN_1], [QTY_1], [BIN_2], [QTY_2], [Supplier], [PalletNumber], [PO], [taskInfo], [NoOfBoxes], [NoOfItems], [Color], [created_at], [updated_at], [taskTypeId], [userId], [taskStatusId], [orderName]) VALUES (N'17d06531-b3f0-46fc-8b25-fb96634f4e15', N'na', N'sdadas', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', N'na', NULL, CAST(N'2024-10-10T16:22:20.1766667' AS DateTime2), CAST(N'2024-10-10T16:22:20.1766667' AS DateTime2), 1, 8, 5, NULL)
// GO
// SET IDENTITY_INSERT [dbo].[user] ON
// GO
// INSERT [dbo].[user] ([id], [userName], [userSurname], [userUuid], [usermail], [userMobile], [userPasswordEnc], [otp], [color]) VALUES (1, N'un assigned', N'un assigned', N'', N'', N'', N'dsadfs897=sdfds', N'0', N'grey')
// GO
// INSERT [dbo].[user] ([id], [userName], [userSurname], [userUuid], [usermail], [userMobile], [userPasswordEnc], [otp], [color]) VALUES (4, N'Noa', N'dr', N'dsadfs897=sdfds', N'noa@email.com', N'052-1111112', N'aaa', N'0', N'orange')
// GO
// INSERT [dbo].[user] ([id], [userName], [userSurname], [userUuid], [usermail], [userMobile], [userPasswordEnc], [otp], [color]) VALUES (5, N'Gaya', N'dr', N'dfssdf=sdfsdf', N'Gg@email.com', N'052-111111', N'aaa', N'0', N'lightblue')
// GO
// INSERT [dbo].[user] ([id], [userName], [userSurname], [userUuid], [usermail], [userMobile], [userPasswordEnc], [otp], [color]) VALUES (8, N'uri', N'dreiblatt', N'kldsf;lsdjflsdk', N'urid@gmail.com', N'050-1111111', N'aaa', N'0', N'lightgreen')
// GO
// SET IDENTITY_INSERT [dbo].[user] OFF
// GO
// SET IDENTITY_INSERT [dbo].[users_roles] ON 
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (1, 1, 1)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (2, 1, 2)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (3, 1, 3)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (4, 1, 4)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (5, 4, 6)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (6, 5, 6)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (7, 8, 6)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (8, 8, 1)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (9, 8, 2)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (10, 8, 3)
// GO
// INSERT [dbo].[users_roles] ([id], [usersId], [roleId]) VALUES (11, 8, 4)
// GO
// SET IDENTITY_INSERT [dbo].[users_roles] OFF
// GO
// SET ANSI_PADDING ON
// GO
// /****** Object:  Index [UQ__order__6C6836C6344DF42C]    Script Date: 11/10/2024 15:00:54 ******/
// ALTER TABLE [dbo].[order] ADD UNIQUE NONCLUSTERED 
// (
// 	[ORDNAME] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// GO
// SET ANSI_PADDING ON
// GO
// /****** Object:  Index [uq_ORDNAME]    Script Date: 11/10/2024 15:00:54 ******/
// ALTER TABLE [dbo].[order] ADD  CONSTRAINT [uq_ORDNAME] UNIQUE NONCLUSTERED 
// (
// 	[ORDNAME] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// GO
// SET ANSI_PADDING ON
// GO
// /****** Object:  Index [UQ__order_li__EDA25BF9AF795BA3]    Script Date: 11/10/2024 15:00:54 ******/
// ALTER TABLE [dbo].[order_line] ADD UNIQUE NONCLUSTERED 
// (
// 	[orderId] ASC,
// 	[PARTNAME] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
// GO
// ALTER TABLE [dbo].[order] ADD  CONSTRAINT [DF_1031171c13130102495201e3e20]  DEFAULT (newsequentialid()) FOR [id]
// GO
// ALTER TABLE [dbo].[order] ADD  CONSTRAINT [DF_e53d92730ba8bd3bd87e73b076b]  DEFAULT (getdate()) FOR [created_at]
// GO
// ALTER TABLE [dbo].[order] ADD  CONSTRAINT [DF_faa05c6206e7196b91251712625]  DEFAULT (getdate()) FOR [updated_at]
// GO
// ALTER TABLE [dbo].[order_Boxes] ADD  CONSTRAINT [DF_01a7c973d9f30479647e44f9842]  DEFAULT (newsequentialid()) FOR [id]
// GO
// ALTER TABLE [dbo].[order_line] ADD  CONSTRAINT [DF_01a7c973d9f30479647e44f9892]  DEFAULT (newsequentialid()) FOR [id]
// GO
// ALTER TABLE [dbo].[order_line] ADD  CONSTRAINT [DF_6bbfbf94a924746b7c40b208343]  DEFAULT (getdate()) FOR [created_at]
// GO
// ALTER TABLE [dbo].[order_line] ADD  CONSTRAINT [DF_d4ea55d45005d65282189ba658b]  DEFAULT (getdate()) FOR [updated_at]
// GO
// ALTER TABLE [dbo].[order_line] ADD  CONSTRAINT [DF_order_line_Fullfiled]  DEFAULT ((0)) FOR [Fullfilled]
// GO
// ALTER TABLE [dbo].[order_line] ADD  CONSTRAINT [DF_order_line_approved]  DEFAULT ((0)) FOR [approved]
// GO
// ALTER TABLE [dbo].[order_line] ADD  CONSTRAINT [DF_order_line_pickingError]  DEFAULT ((0)) FOR [pickingError]
// GO
// ALTER TABLE [dbo].[task_Assembly ] ADD  DEFAULT (newid()) FOR [PKGUID]
// GO
// ALTER TABLE [dbo].[task_Assembly ] ADD  DEFAULT ((0)) FOR [PartNumber]
// GO
// ALTER TABLE [dbo].[task_Assembly ] ADD  DEFAULT ((0)) FOR [QTYtoAssemble]
// GO
// ALTER TABLE [dbo].[task_Assembly ] ADD  CONSTRAINT [DF_task_Assembly _QTYassembled]  DEFAULT ((0)) FOR [QTYassembled]
// GO
// ALTER TABLE [dbo].[task_Assembly ] ADD  CONSTRAINT [DF_task_AssemblyCrt ]  DEFAULT (getdate()) FOR [created_at]
// GO
// ALTER TABLE [dbo].[task_Assembly ] ADD  CONSTRAINT [DF_task_Assemblyupd]  DEFAULT (getdate()) FOR [updated_at]
// GO
// ALTER TABLE [dbo].[task_user] ADD  CONSTRAINT [DF_6ea2c1c13f01b7a383ebbeaebb0]  DEFAULT (newsequentialid()) FOR [id]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [DataInfo]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [PartNumber]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [QTYtoassemble]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [QTYassembled]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [Total]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [BIN]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [QTY]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [BIN_1]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [QTY_1]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [BIN_2]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [QTY_2]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [Supplier]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [PalletNumber]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [PO]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [taskInfo]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [NoOfBoxes]
// GO
// ALTER TABLE [dbo].[task_user] ADD  DEFAULT ('na') FOR [NoOfItems]
// GO
// ALTER TABLE [dbo].[task_user] ADD  CONSTRAINT [DF_3cfcf15d88a8e90b2853036237d]  DEFAULT (getdate()) FOR [created_at]
// GO
// ALTER TABLE [dbo].[task_user] ADD  CONSTRAINT [DF_d0fb7ea33c932f8d661eb8cd275]  DEFAULT (getdate()) FOR [updated_at]
// GO
// ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_color]  DEFAULT ('green') FOR [color]
// GO
// ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK_93cc37b7348b71e325cbde8b03a] FOREIGN KEY([taskStatusId])
// REFERENCES [dbo].[task_status] ([id])
// GO
// ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK_93cc37b7348b71e325cbde8b03a]
// GO
// ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK_bd4a89fb94aab5480bc3af40145] FOREIGN KEY([roleId])
// REFERENCES [dbo].[role] ([id])
// GO
// ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK_bd4a89fb94aab5480bc3af40145]
// GO
// ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK_caabe91507b3379c7ba73637b84] FOREIGN KEY([userId])
// REFERENCES [dbo].[user] ([id])
// GO
// ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK_caabe91507b3379c7ba73637b84]
// GO
// ALTER TABLE [dbo].[order_Boxes]  WITH CHECK ADD  CONSTRAINT [FK_239cfca2a55b98b90b6bef2e43f] FOREIGN KEY([orderId])
// REFERENCES [dbo].[order] ([id])
// GO
// ALTER TABLE [dbo].[order_Boxes] CHECK CONSTRAINT [FK_239cfca2a55b98b90b6bef2e43f]
// GO
// ALTER TABLE [dbo].[order_Boxes]  WITH CHECK ADD  CONSTRAINT [FK_e8b91082592d227455890335e019] FOREIGN KEY([boxSizeId])
// REFERENCES [dbo].[boxsize] ([id])
// GO
// ALTER TABLE [dbo].[order_Boxes] CHECK CONSTRAINT [FK_e8b91082592d227455890335e019]
// GO
// ALTER TABLE [dbo].[order_line]  WITH CHECK ADD  CONSTRAINT [FK_239cfca2a55b98b90b6bef2e44f] FOREIGN KEY([orderId])
// REFERENCES [dbo].[order] ([id])
// GO
// ALTER TABLE [dbo].[order_line] CHECK CONSTRAINT [FK_239cfca2a55b98b90b6bef2e44f]
// GO
// ALTER TABLE [dbo].[order_line]  WITH CHECK ADD  CONSTRAINT [FK_e8b91082592d22745589045e019] FOREIGN KEY([taskStatusId])
// REFERENCES [dbo].[task_status] ([id])
// GO
// ALTER TABLE [dbo].[order_line] CHECK CONSTRAINT [FK_e8b91082592d22745589045e019]
// GO
// ALTER TABLE [dbo].[task_Assembly ]  WITH CHECK ADD  CONSTRAINT [FK_task_AssemblyStatus] FOREIGN KEY([taskStatusId])
// REFERENCES [dbo].[task_status] ([id])
// GO
// ALTER TABLE [dbo].[task_Assembly ] CHECK CONSTRAINT [FK_task_AssemblyStatus]
// GO
// ALTER TABLE [dbo].[task_Assembly ]  WITH CHECK ADD  CONSTRAINT [FK_task_Assemblyuser] FOREIGN KEY([userId])
// REFERENCES [dbo].[user] ([id])
// GO
// ALTER TABLE [dbo].[task_Assembly ] CHECK CONSTRAINT [FK_task_Assemblyuser]
// GO
// ALTER TABLE [dbo].[task_user]  WITH CHECK ADD  CONSTRAINT [FK_0f500c19a4a119f22a82c9b3640] FOREIGN KEY([userId])
// REFERENCES [dbo].[user] ([id])
// GO
// ALTER TABLE [dbo].[task_user] CHECK CONSTRAINT [FK_0f500c19a4a119f22a82c9b3640]
// GO
// ALTER TABLE [dbo].[task_user]  WITH CHECK ADD  CONSTRAINT [FK_dc74492a8458da3a6d51866a531] FOREIGN KEY([taskStatusId])
// REFERENCES [dbo].[task_status] ([id])
// GO
// ALTER TABLE [dbo].[task_user] CHECK CONSTRAINT [FK_dc74492a8458da3a6d51866a531]
// GO
// ALTER TABLE [dbo].[task_user]  WITH CHECK ADD  CONSTRAINT [FK_ec8c9f9c4dadf918431ef5b34d6] FOREIGN KEY([taskTypeId])
// REFERENCES [dbo].[task_type] ([id])
// GO
// ALTER TABLE [dbo].[task_user] CHECK CONSTRAINT [FK_ec8c9f9c4dadf918431ef5b34d6]
// GO
// ALTER TABLE [dbo].[users_roles]  WITH CHECK ADD  CONSTRAINT [FK_b79bad80022725628f1ef92f216] FOREIGN KEY([roleId])
// REFERENCES [dbo].[role] ([id])
// GO
// ALTER TABLE [dbo].[users_roles] CHECK CONSTRAINT [FK_b79bad80022725628f1ef92f216]
// GO
// ALTER TABLE [dbo].[users_roles]  WITH CHECK ADD  CONSTRAINT [FK_deeb1fe94ce2d111a6695a2880e] FOREIGN KEY([usersId])
// REFERENCES [dbo].[user] ([id])
// GO
// ALTER TABLE [dbo].[users_roles] CHECK CONSTRAINT [FK_deeb1fe94ce2d111a6695a2880e]
// GO
// USE [master]
// GO
// ALTER DATABASE [compulockOrders] SET  READ_WRITE 
// GO
