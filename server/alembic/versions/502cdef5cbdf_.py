"""empty message

Revision ID: 502cdef5cbdf
Revises: d9933c9a56b9
Create Date: 2021-12-27 20:58:11.568373

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '502cdef5cbdf'
down_revision = 'd9933c9a56b9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'password',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'password',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###