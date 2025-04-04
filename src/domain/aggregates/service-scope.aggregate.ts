import { BaseAggregateRoot } from '@shared/domain/entities/base.aggregate-root';
import { BaseEntityProps } from '@shared/domain/entities/base.entity';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { Guard } from '@shared/domain/patterns/guard.pattern';
import { Result } from '@shared/domain/patterns/result.pattern';
import { RouteLocationConversionEntity } from './route-location-conversion.entity';
import { ServiceScopeCreatedEvent } from '../events/service-scope.created.event';

interface ServiceScopeProps extends BaseEntityProps {
  serviceScopeCode: string;
  serviceScopeName?: string;
  fmcFileFlag?: string;
  tariffPrefixCode?: string;
  tariffNumber?: string;
  conferenceFlag?: string;
  serviceScopeBoundCode?: string;
  createUserId?: string;
  createDateTime?: Date;
  updateUserId?: string;
  updateDateTime?: Date;
  deleteFlag?: string;
  eaiEvntDateTime?: Date;
  eaiIfId?: string;
  modifyCostCtrCode?: string;
  edwUpdateDateTime?: Date;
  modifyServiceGroupCode?: string;
  dominantFlag?: string;
  serviceScopeGroupName?: string;
  serviceScopeTradeCode?: string;
  referDominantFlag?: string;
  routeLocationConversions: RouteLocationConversionEntity[];
}

export class ServiceScopeAggregate extends BaseAggregateRoot<ServiceScopeProps> {
  constructor(props: ServiceScopeProps, id?: BaseUniqueEntityId) {
    super(props, id);
  }

  /**
   * Getters
   */
  get serviceScopeCode(): string {
    return this.props.serviceScopeCode;
  }

  get serviceScopeName(): string | undefined {
    return this.props.serviceScopeName;
  }

  get fmcFileFlag(): string | undefined {
    return this.props.fmcFileFlag;
  }

  get tariffPrefixCode(): string | undefined {
    return this.props.tariffPrefixCode;
  }

  get tariffNumber(): string | undefined {
    return this.props.tariffNumber;
  }

  get conferenceFlag(): string | undefined {
    return this.props.conferenceFlag;
  }

  get serviceScopeBoundCode(): string | undefined {
    return this.props.serviceScopeBoundCode;
  }

  get createUserId(): string | undefined {
    return this.props.createUserId;
  }

  get createDateTime(): Date | undefined {
    return this.props.createDateTime;
  }

  get updateUserId(): string | undefined {
    return this.props.updateUserId;
  }

  get updateDateTime(): Date | undefined {
    return this.props.updateDateTime;
  }

  get deleteFlag(): string | undefined {
    return this.props.deleteFlag;
  }

  get eaiEvntDateTime(): Date | undefined {
    return this.props.eaiEvntDateTime;
  }

  get eaiIfId(): string | undefined {
    return this.props.eaiIfId;
  }

  get modifyCostCtrCode(): string | undefined {
    return this.props.modifyCostCtrCode;
  }

  get edwUpdateDateTime(): Date | undefined {
    return this.props.edwUpdateDateTime;
  }

  get modifyServiceGroupCode(): string | undefined {
    return this.props.modifyServiceGroupCode;
  }

  get dominantFlag(): string | undefined {
    return this.props.dominantFlag;
  }

  get serviceScopeGroupName(): string | undefined {
    return this.props.serviceScopeGroupName;
  }

  get serviceScopeTradeCode(): string | undefined {
    return this.props.serviceScopeTradeCode;
  }

  get referDominantFlag(): string | undefined {
    return this.props.referDominantFlag;
  }

  get routeLocationConversions(): RouteLocationConversionEntity[] {
    return this.props.routeLocationConversions;
  }

  /**
   * Business rule encapsulated in the domain
   */

  /**
   * Factory method to create service scope aggregate
   */
  public static create(props: ServiceScopeProps, id?: BaseUniqueEntityId) {
    // Guard against null or undefined values
    const guardResult = Guard.againstNullOrUndefined<string>(
      props.serviceScopeCode,
      'serviceScopeCode',
    );

    if (guardResult.isFailure) {
      return Result.fail<ServiceScopeAggregate>(guardResult.getErrorValue());
    }

    const serviceScope = new ServiceScopeAggregate(props, id);
    if (serviceScope) {
      serviceScope.addDomainEvent(
        new ServiceScopeCreatedEvent(serviceScope.id),
      );
    }

    return Result.ok<ServiceScopeAggregate>(serviceScope);
  }
}
