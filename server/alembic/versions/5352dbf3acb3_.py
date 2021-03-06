"""empty message

Revision ID: 5352dbf3acb3
Revises: 
Create Date: 2021-12-20 08:18:25.772210

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5352dbf3acb3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('summary',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('total_time', sa.Integer(), nullable=True),
    sa.Column('total_sessions', sa.Integer(), nullable=True),
    sa.Column('total_finished_tasks', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('is_finished', sa.Boolean(), nullable=True),
    sa.Column('progress', sa.Integer(), nullable=False),
    sa.Column('target', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('timer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('session_time', sa.Integer(), nullable=True),
    sa.Column('short_break_time', sa.Integer(), nullable=True),
    sa.Column('long_break_time', sa.Integer(), nullable=True),
    sa.Column('alarm_sound', sa.String(), nullable=True),
    sa.Column('ticking_sound', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('timer')
    op.drop_table('task')
    op.drop_table('summary')
    op.drop_table('user')
    # ### end Alembic commands ###
