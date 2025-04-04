import { MigrationInterface, QueryRunner } from 'typeorm';
import { SERVICE_SCOPE_SCHEMA } from '../schemas/service-scope.schema';

export class CreateServiceScope1743691869853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO ${SERVICE_SCOPE_SCHEMA.TABLE_NAME} (
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_CODE},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_NAME},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.FMC_FILE_FLAG},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.TARIFF_PREFIX_CODE},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.TARIFF_NUMBER},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.CONFERENCE_FLAG},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_BOUND_CODE},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.CREATE_USER_ID},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.CREATE_DATE_TIME},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.UPDATE_USER_ID},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.UPDATE_DATE_TIME},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.DELETE_FLAG},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.EAI_EVNT_DATE_TIME},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.EAI_IF_ID},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.MODIFY_COST_CTR_CODE},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.EDW_UPDATE_DATE_TIME},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.MODIFY_SERVICE_GROUP_CODE},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.DOMINANT_FLAG},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_GROUP_NAME},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_TRADE_CODE},
              ${SERVICE_SCOPE_SCHEMA.COLUMNS.REFER_DOMINANT_FLAG}
            ) VALUES
          ('EFE','EAST AFRICA - ASIA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','CR0017914','2024-01-25 16:08:58','N',NULL,NULL,'FET','2024-01-25 16:09:01.875','FE','N',NULL,NULL,NULL),
          ('AUS','ASIA - AUSTRALIA (SB)','N',NULL,NULL,'N','S','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-01-31 16:41:32','N',NULL,NULL,'OCT','2024-01-31 16:41:38.648','OC','Y',NULL,NULL,NULL),
          ('AUN','AUSTRALIA - ASIA (NB)','N',NULL,NULL,'N','N','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-01-31 16:47:34','N',NULL,NULL,'OCT','2024-01-31 16:47:35.211','OC','N',NULL,NULL,NULL),
          ('AME','MEDITERRANEAN - ASIA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-02-13 15:51:59','N',NULL,NULL,'MET','2024-02-13 15:52:01.29','ME','N',NULL,NULL,NULL),
          ('AMW','ASIA - MEDITERRANEAN (WB)','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-02-16 14:11:04','N',NULL,NULL,'MET','2024-02-16 14:11:05.507','ME','Y',NULL,NULL,NULL),
          ('IWW','EAST ASIA - WEST ASIA (WB)','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-10 14:59:14','N',NULL,NULL,'WAT','2024-09-10 14:59:15.179','WA','Y','WEST ASIA TRADE','ASOC','N'),
          ('APE','NORTH AMERICA - AFRICA (EB)','Y',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'TAT','2023-12-13 12:51:02.977','TA','N',NULL,NULL,NULL),
          ('APW','AFRICA - NORTH AMERICA (WB)','Y',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'TAT','2023-12-13 12:51:02.977','TA','Y',NULL,NULL,NULL),
          ('EFW','ASIA - EAST AFRICA (WB)','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-01-22 15:49:45','N',NULL,NULL,'FET','2024-01-22 15:49:48.135','FE','Y',NULL,NULL,NULL),
          ('RSE','RED TO ASIA, OCEANIA, PACIFIC / INTRA RED SEA','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-10 14:59:32','N',NULL,NULL,'WAT','2024-09-10 14:59:33.546','WA','N','WEST ASIA TRADE','ASOC','N'),
          ('OEE','EUROPE - OCEANIA (EB)',NULL,NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-01-10 10:52:56','N',NULL,NULL,'NET','2024-01-10 10:52:57.871','NE','N',NULL,NULL,NULL),
          ('OEW','OCEANIA - EUROPE (WB)',NULL,NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-01-10 10:53:23','N',NULL,NULL,'NET','2024-01-10 10:53:24.863','NE','Y',NULL,NULL,NULL),
          ('NZS','ASIA - NEW ZEALAND (SB)','N',NULL,NULL,'N','S','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-01-31 16:42:18','N',NULL,NULL,'OCT','2024-01-31 16:42:19.786','OC','Y',NULL,NULL,NULL),
          ('CSE','ASIA - CARIBBEAN SEA (EB)',NULL,NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-16 17:34:39','N',NULL,NULL,'LET','2024-09-16 17:34:41.43','LE','Y','LATIN AMERICA EAST TRADE','AFLA','N'),
          ('WEW','WEST ASIA - EUROPE (WB)','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-03-29 08:22:28','N',NULL,NULL,'NET','2024-03-29 08:22:30.618','NE','Y',NULL,NULL,NULL),
          ('NZN','NEW ZEALAND - ASIA (NB)','N',NULL,NULL,'N','N','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-01-31 16:43:51','N',NULL,NULL,'OCT','2024-01-31 16:43:53.605','OC','N',NULL,NULL,NULL),
          ('CSW','CARIBBEAN SEA - ASIA (WB)',NULL,NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-16 17:34:52','N',NULL,NULL,'LET','2024-09-16 17:34:53.538','LE','N','LATIN AMERICA EAST TRADE','AFLA','Y'),
          ('LWN','WEST COAST SOUTH AMERICA - NORTH AMERICA (NB)','Y',NULL,NULL,'N','N','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'LWT','2023-12-13 12:51:02.981','LW','N',NULL,NULL,NULL),
          ('LWS','NORTH AMERICA - WEST COAST SOUTH AMERICA (SB)','Y',NULL,NULL,'N','S','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'LWT','2023-12-13 12:51:02.981','LW','N',NULL,NULL,NULL),
          ('ZFW','ASIA - SOUTH AFRICA (WB)','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-02 15:44:18','N',NULL,NULL,'FET','2024-08-02 15:44:20.118','FE','Y',NULL,NULL,NULL),
          ('OME','MEDITERRANEAN - OCEANIA (EB)',NULL,NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'MET','2023-12-13 12:51:03.083','ME','N',NULL,NULL,NULL),
          ('OMW','OCEANIA - MEDITERRANEAN (WB)',NULL,NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'MET','2023-12-13 12:51:03.083','ME','Y',NULL,NULL,NULL),
          ('OTH','OTHERS','N',NULL,NULL,'N','A','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'CMN','2023-12-13 12:51:03.083','OT','N',NULL,NULL,NULL),
          ('PON','PACIFIC OCEAN - ASIA (NB)',NULL,NULL,NULL,'N','N','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'OCT','2023-12-13 12:51:03.084','OC','N',NULL,NULL,NULL),
          ('POS','ASIA - PACIFIC OCEAN (SB)',NULL,NULL,NULL,'N','S','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'OCT','2023-12-13 12:51:03.084','OC','Y',NULL,NULL,NULL),
          ('WFE','WEST AFRICA - ASIA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'FWT','2023-12-13 12:51:03.1','FW','N',NULL,NULL,NULL),
          ('WMW','WEST ASIA - MEDITERRANEAN (WB)','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'MET','2023-12-13 12:51:03.101','ME','Y',NULL,NULL,NULL),
          ('ZFE','SOUTH AFRICA - ASIA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','CR0017914','2023-12-13 00:00:00','N',NULL,NULL,'FET','2023-12-13 12:51:03.101','FE','N',NULL,NULL,NULL),
          ('INA','INTRA NORTH AMERICA','Y',NULL,NULL,'N','A','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-03-18 12:00:52','N',NULL,NULL,'TPT','2024-03-19 04:08:11.545','TP','N',NULL,NULL,NULL),
          ('OPE','OCEANIA - NORTH AMERICA (EB)','Y',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-03-18 12:01:34','N',NULL,NULL,'TPT','2024-03-19 04:08:27.581','TP','Y',NULL,NULL,NULL),
          ('IAF','INTRA AFRICA','N',NULL,NULL,'N','A','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-03 09:26:05','N',NULL,NULL,'FWT','2024-09-03 09:26:07.296','FW','Y','ASIA WEST AFRICA TRADE','AFLA','N'),
          ('IEA','INTRA EUROPE','N',NULL,NULL,'N','A','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-15 10:05:35','N',NULL,NULL,'NET','2024-08-15 10:05:37.442','NE','N',NULL,NULL,NULL),
          ('LEE','EAST COAST SOUTH AMERICA - ASIA (EB)',NULL,NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-16 17:35:06','N',NULL,NULL,'LET','2024-09-16 17:35:07.502','LE','N','LATIN AMERICA EAST TRADE','AFLA','Y'),
          ('WEE','EUROPE - WEST ASIA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-03 14:08:28','N',NULL,NULL,'NET','2024-09-03 14:08:29.293','NE','N','ASIA NORTH EUROPE TRADE','NEME','Y'),
          ('LWE','ALL - WEST COAST SOUTH AMERICA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-07-05 13:25:33','N',NULL,NULL,'LWT','2024-07-05 13:25:35.206','LW','Y',NULL,NULL,NULL),
          ('LWW','WEST COAST SOUTH AMERICA - ALL (WB)',NULL,NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-07-05 13:27:14','N',NULL,NULL,'LWT','2024-07-05 13:28:05.425','LW','N',NULL,NULL,NULL),
          ('AEW','ASIA - EUROPE (WB)','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-07-22 14:58:57','N',NULL,NULL,'NET','2024-07-22 14:59:01.753','NE','Y',NULL,NULL,NULL),
          ('IAA','INTRA ASIA (SB/NB)','N',NULL,NULL,'N','A','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-07-26 12:12:50','N',NULL,NULL,'EAT','2024-07-26 12:12:52.004','EA','Y',NULL,NULL,NULL),
          ('ILW','INTRA WEST COAST SOUTH AMERICA','N',NULL,NULL,'N','A','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-29 14:34:03','N',NULL,NULL,'LWT','2024-08-29 14:34:04.52','LW','N','LATIN AMERICA WEST TRADE','AFLA','Y'),
          ('AFN','WEST AND EAST AFRICA - EUROPE (NB)','N',NULL,NULL,'N','N','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-06-07 11:43:24','N',NULL,NULL,'EFT','2024-06-07 11:43:25.445','EF','N',NULL,NULL,NULL),
          ('AFS','EUROPE - WEST AND EAST AFRICA (SB)','N',NULL,NULL,'N','S','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-06-07 11:43:41','N',NULL,NULL,'EFT','2024-06-07 11:43:42.409','EF','Y',NULL,NULL,NULL),
          ('ZFN','SOUTH AFRICA - EUROPE (NB)','N',NULL,NULL,'N','N','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-06-07 11:44:23','N',NULL,NULL,'EFT','2024-06-07 11:44:24.648','EF','N',NULL,NULL,NULL),
          ('ZFS','EUROPE - SOUTH AFRICA (SB)','N',NULL,NULL,'N','S','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-06-07 11:44:41','N',NULL,NULL,'EFT','2024-06-07 11:44:42.489','EF','Y',NULL,NULL,NULL),
          ('LAN','EAST COAST SOUTH AMERICA - NORTH AMERICA (NB)','Y',NULL,NULL,'N','N','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-29 14:23:45','N',NULL,NULL,'LNT','2024-08-29 14:23:46.655','LN','Y','LATIN AMERICA NORTH TRADE','AFLA','Y'),
          ('LEA','INTRA EAST COAST SOUTH AMERICA',NULL,NULL,NULL,'N','A','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-29 14:25:53','N',NULL,NULL,'LNT','2024-08-29 14:25:54.718','LN','Y','LATIN AMERICA NORTH TRADE','AFLA','Y'),
          ('LEW','ASIA - EAST COAST SOUTH AMERICA (WB)',NULL,NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-16 17:35:24','N',NULL,NULL,'LET','2024-09-16 17:35:25.378','LE','Y','LATIN AMERICA EAST TRADE','AFLA','N'),
          ('WFW','ASIA - WEST AFRICA (WB)','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-01-22 15:50:00','N',NULL,NULL,'FWT','2024-01-22 15:50:01.904','FW','Y',NULL,NULL,NULL),
          ('OPW','NORTH AMERICA - OCEANIA (WB)','Y',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-03-18 12:01:58','N',NULL,NULL,'TPT','2024-03-19 04:08:34.012','TP','N',NULL,NULL,NULL),
          ('WPE','WEST ASIA AND AFRICA - NORTH AMERICA (EB)','Y',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-03-18 12:04:39','N',NULL,NULL,'TPT','2024-03-19 04:09:26.653','TP','Y',NULL,NULL,NULL),
          ('AHE','ALL - HAWAII (IMPORT)','Y',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-30 16:28:28','N',NULL,NULL,'TPT','2024-08-30 16:28:36.483','TP','Y','TRANS PACIFIC TRADE','TPTA','N'),
          ('AHW','HAWAII - ALL (EXPORT)','Y',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-30 16:29:13','N',NULL,NULL,'TPT','2024-08-30 16:29:26.703','TP','N','TRANS PACIFIC TRADE','TPTA','Y'),
          ('TAW','EUROPE - NORTH AMERICA (WB)',NULL,NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-07-18 18:59:50','N',NULL,NULL,'TAT','2024-07-18 18:59:51.797','TA','Y',NULL,NULL,NULL),
          ('IWE','WEST ASIA - EAST ASIA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-12 13:46:18','N',NULL,NULL,'WAT','2024-09-12 13:46:19.537','WA','N','WEST ASIA TRADE','ASOC','Y'),
          ('WPW','NORTH AMERICA - WEST ASIA AND AFRICA (WB)','Y',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-16 10:13:53','N',NULL,NULL,'TPT','2024-09-16 10:13:54.549','TP','N','TRANS PACIFIC TRADE','TPTA','Y'),
          ('LWU','WEST COAST SOUTH AMERICA - EUROPE','N',NULL,NULL,'N','E','zhongda.ng@one-line.com','2023-03-02 17:52:04','zhongda.ng@one-line.com','2024-08-27 11:10:07','N',NULL,NULL,'LUT','2024-08-27 11:10:08.463','LU','Y','LATIN EUROPE TRADE','AFLA','Y'),
          ('LEN','EAST COAST SOUTH AMERICA - EUROPE (NB)','N',NULL,NULL,'N','N','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-29 14:28:33','N',NULL,NULL,'LUT','2024-08-29 14:28:37.986','LU','Y','LATIN EUROPE TRADE','AFLA','Y'),
          ('LAS','NORTH AMERICA - EAST COAST SOUTH AMERICA (SB)','Y',NULL,NULL,'N','S','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-29 14:31:06','N',NULL,NULL,'LNT','2024-08-29 14:31:07.944','LN','N','LATIN AMERICA NORTH TRADE','AFLA','N'),
          ('LES','EUROPE - EAST COAST SOUTH AMERICA (SB)','N',NULL,NULL,'N','S','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-08-29 14:32:00','N',NULL,NULL,'LUT','2024-08-29 14:32:02.037','LU','N','LATIN EUROPE TRADE','AFLA','N'),
          ('RSW','ASIA, OCEANIA, PACIFIC OCEAN TO RED SEA','N',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-09-10 14:59:53','N',NULL,NULL,'WAT','2024-09-10 14:59:54.763','WA','Y','WEST ASIA TRADE','ASOC','Y'),
          ('LUW','EUROPE - WEST COAST SOUTH AMERICA','N',NULL,NULL,'N','W','zhongda.ng@one-line.com','2023-03-02 17:52:05','OPUSADM','2024-11-01 20:17:09','N',NULL,NULL,'LUT','2024-11-01 20:17:10.626','LU','N','LATIN EUROPE TRADE','AFLA','N'),
          ('AEE','EUROPE - ASIA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','OPUSADM','2025-02-04 12:05:30','N',NULL,NULL,'NET','2025-02-04 12:05:32.305','NE','N','ASIA NORTH EUROPE TRADE','DFDF','Y'),
          ('WME','MEDITERRANEAN - WEST ASIA (EB)','N',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-05-31 19:32:59','N',NULL,NULL,'MET','2024-05-31 19:33:02.569','ME','N',NULL,NULL,NULL),
          ('TPW','NORTH AMERICA - ASIA (WB)','Y',NULL,NULL,'N','W','MIGUSER','2017-12-06 18:03:23','OPUSADM','2024-11-06 15:02:05','N',NULL,NULL,'TPT','2024-11-06 15:02:06.97','TP','N','TRANS PACIFIC TRADE','TPTA','Y'),
          ('TPE','ASIA - NORTH AMERICA (EB)','Y',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2025-03-05 10:47:22','N',NULL,NULL,'TPT','2025-03-05 10:47:23.505','TP','Y','TRANS PACIFIC TRADE','TPTA','N'),
          ('TAE','NORTH AMERICA - EUROPE (EB)','Y',NULL,NULL,'N','E','MIGUSER','2017-12-06 18:03:23','zhongda.ng@one-line.com','2024-07-02 15:44:10','N',NULL,NULL,'TAT','2024-07-02 15:44:11.92','TA','N',NULL,NULL,NULL);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
