import { UnwrapEmptyError, UnwrapErrError, UnwrapOkError } from './error';

const empty = Symbol();

export class Result<T, E extends Error = Error> {
  private _ok: boolean;

  constructor(private _value: T | typeof empty, private _error: E | typeof empty = empty) {
    this._ok = _error === empty;
  }

  get ok(): boolean {
    return this._ok;
  }

  get err(): boolean {
    return !this._ok;
  }

  private get value(): T {
    if (this._value === empty) {
      throw new UnwrapEmptyError();
    }
    return this._value;
  }

  private get error(): E {
    if (this._error === empty) {
      throw new UnwrapOkError();
    }
    return this._error;
  }

  map<U, Err extends Error = E>(operator: (value: T) => U): Result<U, E | Err> {
    if (this.err) {
      return new Result<U, E | Err>(empty, this.error);
    }

    try {
      const result = operator(this.value);

      return new Result<U, E | Err>(result);
    } catch (err) {
      return new Result<U, E | Err>(empty, err as Err);
    }
  }

  unwrap(): T {
    if (this.err) {
      throw new UnwrapErrError();
    }
    return this.value;
  }

  unwrapErr(): E {
    if (this.ok) {
      throw new UnwrapOkError();
    }
    return this.error;
  }
}

export const ok = <T>(value: T): Result<T> => {
  return new Result(value);
};

export const err = <T, E extends Error = Error>(err: E): Result<T, E> => {
  return new Result<T, E>(empty, err);
};
