import { BaseAggregateRoot } from 'src/shared/domain/entities/base.aggregate-root';
import {
  BaseEntity,
  BaseEntityProps,
} from 'src/shared/domain/entities/base.entity';
import { BaseUniqueEntityId } from 'src/shared/domain/identifier/base.unique-entity.id';
import { Guard } from 'src/shared/domain/patterns/guard.pattern';
import { Result } from 'src/shared/domain/patterns/result.pattern';
import { ServiceScopeAggregate } from './service-scope.aggregate';

interface RouteLocationConversionProps extends BaseEntityProps {
  serviceScopeCode: string;
  originalLocationCode: string;
  conversionLocationCode: string;
  porApplyFlag?: string;
  polApplyFlag?: string;
  podApplyFlag?: string;
  delApplyFlag?: string;
  preRelayPortApplyFlag?: string;
  postRelayPortApplyFlag?: string;
  createUserId?: string;
  createDateTime?: Date;
  updateUserId?: string;
  updateDateTime?: Date;
  edwUpdateDateTime?: Date;
  serviceScope: ServiceScopeAggregate;
}

export class RouteLocationConversionEntity extends BaseEntity<RouteLocationConversionProps> {
  constructor(props: RouteLocationConversionProps, id?: BaseUniqueEntityId) {
    super(props, id);
  }

  /**
   * Getters
   */
  get serviceScopeCode(): string {
    return this.props.serviceScopeCode;
  }

  get originalLocationCode(): string {
    return this.props.originalLocationCode;
  }

  get conversionLocationCode(): string {
    return this.props.conversionLocationCode;
  }

  get porApplyFlag(): string | undefined {
    return this.props.porApplyFlag;
  }

  get polApplyFlag(): string | undefined {
    return this.props.polApplyFlag;
  }

  get podApplyFlag(): string | undefined {
    return this.props.podApplyFlag;
  }

  get delApplyFlag(): string | undefined {
    return this.props.delApplyFlag;
  }

  get preRelayPortApplyFlag(): string | undefined {
    return this.props.preRelayPortApplyFlag;
  }

  get postRelayPortApplyFlag(): string | undefined {
    return this.props.postRelayPortApplyFlag;
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

  get edwUpdateDateTime(): Date | undefined {
    return this.props.edwUpdateDateTime;
  }

  get serviceScope(): ServiceScopeAggregate {
    return this.props.serviceScope;
  }

  /**
   * Business rule encapsulated in the domain
   */

  /**
   * Factory method to create service scope aggregate
   */
  public static create(
    props: RouteLocationConversionProps,
    id?: BaseUniqueEntityId,
  ) {
    // Guard against null or undefined values
    const guardResult = Guard.againstNullOrUndefinedBulk<string>([
      { argument: props.serviceScopeCode, argumentName: 'serviceScopeCode' },
      {
        argument: props.originalLocationCode,
        argumentName: 'originalLocationCode',
      },
      {
        argument: props.conversionLocationCode,
        argumentName: 'conversionLocationCode',
      },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<ServiceScopeAggregate>(guardResult.getErrorValue());
    }

    const routeLocationConversion = new RouteLocationConversionEntity(
      props,
      id,
    );
    return Result.ok<RouteLocationConversionEntity>(routeLocationConversion);
  }
}
