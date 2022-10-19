USE [Calc]
GO

/****** Object:  Table [dbo].[Record]    Script Date: 10/11/2022 3:23:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Record](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[OperationId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[Amount] [smallmoney] NULL,
	[UserBalance] [smallmoney] NULL,
	[OperationResponse] [smallmoney] NULL,
	[Date] [datetime] NULL,
 CONSTRAINT [PK_Record] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Record]  WITH CHECK ADD CONSTRAINT [FK_Record_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Record] WITH CHECK ADD CONSTRAINT [FK_Record_Operation] FOREIGN KEY ([OperationId])
REFERENCES [dbo].[Operation] ([Id])
GO


